import IBaseWindow from '../base/window';
declare let window: IWindow;

export interface IWindow extends IBaseWindow {

    //
    // @info: extend IBaseWindow if required (or desired)
    //

    global: <T>(key: string, value?: T) => T;
}

window.global = <T>(key: string, value: T): T => {
    return ((value === undefined) ? window[key] : window[key] = value) as T;
};

export default window;
