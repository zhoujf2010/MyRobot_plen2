
from __future__ import annotations
from functools import partial
from concurrent import futures
import async_timeout
import asyncio
from aiohttp import web
import json
import logging
from webFrame.baseview import BaseView
from contextlib import suppress
from typing import Any
import voluptuous as vol
from aiohttp import WSMsgType, web
from webFrame.commontool import JSONEncoder

def CVstring(value: Any) -> str:
    """Coerce value to string, except for None."""
    if value is None:
        raise vol.Invalid("string value is None")

    # if isinstance(value, ResultWrapper):
    #     value = value.render_result

    elif isinstance(value, (list, dict)):
        raise vol.Invalid("value should be a string")

    return str(value)
    
positive_int = vol.All(vol.Coerce(int), vol.Range(min=0))
MINIMAL_MESSAGE_SCHEMA = vol.Schema(
    {vol.Required("id"): positive_int, vol.Required("type"): CVstring},
    extra=vol.ALLOW_EXTRA,
)


CANCELLATION_ERRORS = (asyncio.CancelledError, futures.CancelledError)

class WebsocketAPIView(BaseView):
    """View to serve a websockets endpoint."""

    name = "websocketapi"
    url = "api/websocket"
    requires_auth = False

    def __init__(self, app,commonHandle):
        """Initialize the token view."""
        self.app = app
        self.commonHandle = commonHandle
        app.CurrentWSClients =[]

    async def get(self, request: web.Request) -> web.WebSocketResponse:
        """Handle an incoming websocket connection."""
        return await WebSocketHandler(self.app, request,self.commonHandle).async_handle()

class WebSocketAdapter(logging.LoggerAdapter):
    """Add connection id to websocket messages."""

    def process(self, msg, kwargs):
        """Add connid to websocket log messages."""
        return f'[{self.extra["connid"]}] {msg}', kwargs

class WebSocketHandler:
    """Handle an active websocket client connection."""

    def __init__(self, app, request,commonHandle):
        """Initialize an active connection."""
        self.app = app
        self.request = request
        self.wsock: web.WebSocketResponse | None = None
        self._to_write: asyncio.Queue = asyncio.Queue(maxsize=2048)
        self._handle_task = None
        self._writer_task = None
        _WS_LOGGER = logging.getLogger(f"{__name__}.connection")
        self._logger = WebSocketAdapter(_WS_LOGGER, {"connid": id(self)})
        self._peak_checker_unsub = None
        self.commonHandle = commonHandle

    async def _writer(self):
        """Write outgoing messages."""
        # Exceptions if Socket disconnected or cancelled by connection handler
        with suppress(RuntimeError, ConnectionResetError, *CANCELLATION_ERRORS):
            while not self.wsock.closed:
                message = await self._to_write.get()
                if message is None:
                    break

                if not isinstance(message, str):
                    JSON_DUMP = partial(json.dumps, cls=JSONEncoder, allow_nan=False)
                    message = JSON_DUMP(message)

                # self._logger.debug("Sending %s", message)

                await self.wsock.send_str(message)

        # Clean up the peaker checker when we shut down the writer
        if self._peak_checker_unsub:
            self._peak_checker_unsub()
            self._peak_checker_unsub = None

    def send_message(self, message):
        """Send a message to the client.

        Closes connection if the client is not reading the messages.

        Async friendly.
        """
        try:
            self._to_write.put_nowait(message)
        except asyncio.QueueFull:
            self._logger.error(
                "Client exceeded max pending messages [2]: %s", 2048
            )

            self._cancel()

        if self._to_write.qsize() < 512:
            if self._peak_checker_unsub:
                self._peak_checker_unsub()
                self._peak_checker_unsub = None
            return

    def _cancel(self):
        """Cancel the connection."""
        self._handle_task.cancel()
        self._writer_task.cancel()

    async def async_handle(self) -> web.WebSocketResponse:
        """Handle a websocket response."""
        request = self.request
        wsock = self.wsock = web.WebSocketResponse(heartbeat=55)
        await wsock.prepare(request)
        self._logger.debug("Connected from %s", request.remote)
        self._handle_task = asyncio.current_task()

        # As the webserver is now started before the start
        # event we do not want to block for websocket responses
        self._writer_task = asyncio.create_task(self._writer())

        try:
            self.app.CurrentWSClients.append(self)

            # Command phase
            while not wsock.closed:
                msg = await wsock.receive()
                await self.commonHandle(self.app,self,msg.data)

        except Exception as e:
            self._logger.error("error:",e)
        finally:
            try:
                if self in self.app.CurrentWSClients:
                    self.app.CurrentWSClients.remove(self)
                self._to_write.put_nowait(None)
                # Make sure all error messages are written before closing
                await self._writer_task
                await wsock.close()
            except asyncio.QueueFull:  # can be raised by put_nowait
                self._writer_task.cancel()

            finally:
                self._logger.debug("Disconnected")
        return wsock

