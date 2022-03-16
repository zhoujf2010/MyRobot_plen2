#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
#include <Servo.h>
#include <Ticker.h>
#include <EEPROM.h>
#include <ESP8266WiFi.h>

#include "./otatool.h"
#include "./common.h"

String firmversion =    "2.0";
String DEVICE    =      "robot";
#define LED             2
#define LEDON           LOW
#define LEDOFF          HIGH
const int PCA9685_ENABLE = 13;

Ticker led_timer;
Ticker flipper;

Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();
Servo GPIO12SERVO;
Servo GPIO14SERVO;
const int servo_map[18] = {16, 7, 6, 5, 4, 3, 2, 1, 0, 17, 8,  9,  10, 11, 12, 13, 14, 15};
int servo_cent[18];  //舵机复位位置记录
#define SERVOMIN  175 // this is the 'minimum' pulse length count (out of 4096)
#define SERVOMAX  575 // this is the 'maximum' pulse length count (out of 4096)

WiFiServer socketserver(8080);//你要的端口号，随意修改，范围0-65535
WiFiClient client;

void setpwmangle(int index, int angle) {
  int v = angle + servo_cent[index]; //居中矫正
  int pwmdt =  map(v, -800, 800, SERVOMAX, SERVOMIN); //范围矫正

  index = servo_map[index];

  if (index == 16) {
    pwmdt = 90 + v / 10;
    GPIO12SERVO.write(pwmdt);
  }
  else if (index == 17) {
    pwmdt = 90 + v / 10;
    GPIO14SERVO.write(pwmdt);
  }
  else
    pwm.setPWM(index, 0, pwmdt);
}

int m_pwms[18];

void initServo() {
  pinMode(PCA9685_ENABLE, OUTPUT);
  digitalWrite(PCA9685_ENABLE, LOW);

  // Initialize I2C
  Wire.begin(4, 5);
  pwm.begin();
  pwm.setPWMFreq(60);  // servos run at 300Hz updates
  GPIO12SERVO.attach(12);
  GPIO14SERVO.attach(14);

  for (int i = 0; i < 18; i++) {
    int v = readCusVal2(i) - 800;

    if (v > 800 || v < -800)
      v = 0;
    servo_cent[i] = v;
    m_pwms[i] = 0;
    Serial.print("servo:");
    Serial.print(i);
    Serial.print("，initangle:");
    Serial.println(v);
  }

  flipper.attach_ms(40, updateAngle);
  Serial.println("16 channel Servo started!");
}

//路由器WIFI和密码
const char* ssid = "qinhh";
const char* password = "58766730";

//静态地址、网关、子网掩码
IPAddress local_IP(192, 168, 3, 50);
IPAddress gateway(192, 168, 3, 1);
IPAddress subnet(255, 255, 255, 0);

void setup() {
  Serial.begin(115200);
  Serial.println("start......");

  pinMode(LED, OUTPUT);
  led_timer.attach(0.5, blink);

  StartInit();
  
  initServo();
  
  //连接网络信息
  WiFi.config(local_IP, gateway, subnet);//设置静态IP
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);//路由器的WiFi名称和密码
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  initOTA(LED);// 初使化OTA模式
  
  socketserver.begin();
  socketserver.setNoDelay(true);  //加上后才正常些

  StartFinish();
  led_timer.detach();
  digitalWrite(LED, LEDON); //灯常亮，表示连接成功
}

boolean cycle_finished = true;

void updateAngle() {
  if (!cycle_finished)
    return;

  cycle_finished = false;

  for (int i = 0; i < 18; i++) {
    setpwmangle(i, m_pwms[i]);
  }
  cycle_finished = true;
}


void blink() {
  digitalWrite(LED, !digitalRead(LED));
}


#define bufferSize 10
uint8_t buf1[bufferSize];
uint16_t i1 = 0;


void loop() {
  if (loopOTA())
    return ;

  if (!client.connected()) { // if client not connected
    client = socketserver.available(); // wait for it to connect
    return;
  }

  if (client.available()) {
    i1 = 0;
    while (client.available()) {
      buf1[i1] = (uint8_t)client.read(); // read char from client (RoboRemo app)
      i1++;
      if (i1 == 2) {
        int ch1 = buf1[0];
        int ch2 = buf1[1];
        if (ch1 == 0 && ch2 == 0)
        {
          String recstr = "OK";
          client.write(recstr.c_str(), recstr.length());
          i1 = 0;
        }
      }
      if (i1 == 5) {
        int cmd = buf1[0];
        int joint = buf1[1];
        int minus = buf1[2];
        int angle = buf1[3] * 256 + buf1[4];
        if (minus == 1)
          angle = -angle;

        Serial.print("receive, cmd:");
        Serial.print(cmd);
        Serial.print(",joint:");
        Serial.print(joint);
        Serial.print(",angle:");
        Serial.println(angle);

        if (cmd == 1) {
          m_pwms[joint] = angle;
        }
        else if (cmd == 2) { //保存0位点
          writeCusVal2(joint, angle + 800);
          Serial.println("save");
          int val = angle + 800;
          int v = readCusVal2(joint) - 800;
          Serial.print("testRead:");
          Serial.println(v);
        }
        i1 = 0;
      }
    }
  }
}
