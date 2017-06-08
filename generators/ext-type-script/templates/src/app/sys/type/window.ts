///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import '../../../dts/index.d';
import IBaseWindow from '../base/window';

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

declare let window:IWindow;

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export interface IWindow extends IBaseWindow {
    global:<T>(key:string, value?:T) => T;
}

window.global = <T>(key:string, value:T):T => {
    return <T>((value === undefined) ? window[key] : window[key] = value);
};

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export type TranslationFunction = I18next.TranslationFunction;
export type TranslationOptions = I18next.TranslationOptions;

export interface IWindow extends IBaseWindow {
    i18n:(callback:(err:any, t:TranslationFunction) => void) => void;
}

export let i18n = window.i18n;

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export default window;

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////