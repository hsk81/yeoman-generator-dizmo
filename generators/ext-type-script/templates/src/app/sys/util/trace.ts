/* tslint:disable:ban-types no-string-literal no-console one-line prefer-const */
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import bundle from '../type/bundle';
import window from '../type/window';

import './random';

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export function trace(
    flag:boolean):Function;
export function trace(
    ctor:Function):void;
export function trace(
    arg:boolean|Function):Function|void
{
    if (typeof arg === 'boolean') {
        return _trace(arg);
    } else {
        _trace(true)(arg as Function);
    }
}

function _trace(flag:boolean):Function {
    return function(ctor:Function) {
        Object.keys(ctor.prototype).forEach((key:string) => {
            let dtor = Object.getOwnPropertyDescriptor(ctor.prototype, key);
            if (dtor && typeof dtor.value === 'function') {
                _traceable(flag)(ctor.prototype, key);
            }
        });
        Object.keys(ctor).forEach((key:string) => {
            let dtor = Object.getOwnPropertyDescriptor(ctor, key);
            if (dtor && typeof dtor.value === 'function') {
                _traceable(flag)(ctor, key);
            }
        });
    };
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export function traceable(
    flag:boolean):Function;
export function traceable(
    target:any, key:string, dtor?:PropertyDescriptor):void;
export function traceable(
    arg:boolean|any, key?:string, dtor?:PropertyDescriptor
):Function|void {
    if (typeof arg === 'boolean') {
        return _traceable(arg);
    } else {
        _traceable(true)(arg as any, key, dtor);
    }
}

function _traceable(flag:boolean):Function {
    let T0 = bundle.publicStorage.getProperty('TRACE', {
        fallback: window.global<boolean>('TRACE')
    });
    return function(target:any, key:string, dtor?:PropertyDescriptor) {
        let wrap = (fn:Function, callback:Function) => {
            if (!flag) {
                (fn as any)['_traced'] = false;
            } else {
                if ((fn as any)['_traced'] === undefined) {
                    (fn as any)['_traced'] = true;

                    let tn:Function = function(...args:any[]) {
                        let T1 = window.global<boolean>('TRACE');
                        if (T0 !== false && T1 !== false && (T0 || T1)) {
                            let _named = target._named || '@';

                            setTimeout(() => {
                                console.group(`${_named}.${key}`);
                                console.debug(args);
                                console.debug(result);
                            }, T0 || T1 || 0);

                            let result = fn.apply(this, args);

                            setTimeout(() => {
                                console.groupEnd();
                            }, T0 || T1 || 0);

                            return result;
                        } else {
                            return fn.apply(this, args);
                        }
                    };
                    for (let el in fn) {
                        if (fn.hasOwnProperty(el)) {
                            (tn as any)[el] = (fn as any)[el];
                        }
                    }
                    callback(tn);
                }
            }
        };
        if (dtor) {
            if (typeof dtor.value === 'function') {
                wrap(dtor.value, (tn:Function) => {
                    dtor.value = tn;
                });
            } else {
                if (typeof dtor.get === 'function') {
                    wrap(dtor.get, (tn:Function) => {
                        dtor.get = tn as any;
                    });
                }
                if (typeof dtor.set === 'function') {
                    wrap(dtor.set, (tn:Function) => {
                        dtor.set = tn as any;
                    });
                }
            }
        } else {
            wrap(target[key], (tn:Function) => {
                target[key] = tn;
            });
        }
    };
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export default trace;

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
