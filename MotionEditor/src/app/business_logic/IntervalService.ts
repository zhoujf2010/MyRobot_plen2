import { Injectable } from '@angular/core';
import { IPromise } from 'angular';


class MyPromise {// implements ng.IPromise<any>{

    // then<TResult1 = any, TResult2 = never>(successCallback?: ((value: any) => TResult1 | PromiseLike<never> | PromiseLike<TResult1>) | null, errorCallback?: ((reason: any) => TResult2 | PromiseLike<never> | PromiseLike<TResult2>) | null, notifyCallback?: (state: any) => any): IPromise<TResult1 | TResult2>;



    // then<TResult1 = any, TResult2 = never>(successCallback?: ((value: any) => TResult1 | IPromise<never> | IPromise<TResult1>) | null, errorCallback?: ((reason: any) => TResult2 | IPromise<never> | IPromise<TResult2>) | null, notifyCallback?: (state: any) => any): IPromise<TResult1 | TResult2>;
    // then(successCallback?: any, errorCallback?: any, notifyCallback?: any): IPromise<ng.TResult1 | ng.TResult2> | IPromise<TResult1 | TResult2> {
    //     throw new Error('Method not implemented.');
    // }
    catch<TResult = never>(onRejected?: ((reason: any) => PromiseLike<never> | TResult | PromiseLike<TResult>) | null): IPromise<any>;
    catch<TResult = never>(onRejected?: ((reason: any) => IPromise<never> | TResult | IPromise<TResult>) | null): IPromise<any>;
    catch(onRejected?: any): IPromise<any> {
        throw new Error('Method not implemented.');
    }
    finally(finallyCallback: () => void) {
        this._finallyCallback = finallyCallback;
    }

    then(fun: Function): void {
        this._fun = fun;
        fun();
    }


    private _fun: Function;
    private _finallyCallback: () => void;
    public isRun: boolean;

    doLoop(timeout, count, obj) {
        if (count == 0) {
            obj._finallyCallback();
            return;
        }
        if (!obj.isRun) {
            // obj._finallyCallback();
            return; //终止
        }
        obj._fun();

        setTimeout(obj.doLoop, timeout, timeout, count - 1, obj);
    }
}

@Injectable({
    providedIn: 'root',
})
export class IntervalService {// implements ng.IIntervalService{

    create(func: Function, delay: number, count?: number, invokeApply?: boolean, ...args: any[]):
        MyPromise {
        var pm = new MyPromise();
        pm.then(func);
        pm.isRun = true;
        pm.doLoop(delay, count, pm);

        return pm;
    }

    cancel(promise: MyPromise) {
        promise.isRun = false;
    }

}
