import UUID from '../util/uuid';

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export interface IBaseStorage {
    [arg:string]:any;
}

export interface IBaseStorage {
    getProperty:
        <T>(path:string, options?:{
                fallback?:T, nodes?:boolean, string?:boolean
        }) => T;

    setProperty:
        <T>(path:string, value:T, options?:{
            file?:boolean, timeout?:number, string?:boolean
        }) => void;

    deleteProperty:
        (path:string) => void;
}

export interface IBaseStorage {
    subscribeToProperty:
        (path:string, callback:Function, options?:{
            nodes?:boolean, recursive?:boolean, string?:boolean
        }, subscribedCallback?:Function) => UUID;

    unsubscribeProperty:
        (subscriptionId:UUID) => void;
}

export interface IBaseStorage {
    beginUpdate:
        (path:string) => void;
    endUpdate:
        (path:string) => void;
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export default IBaseStorage;

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
