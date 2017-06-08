import UUID from '../util/uuid';
import IBaseDizmo from './dizmo';
import IBaseStorage from './storage';

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export interface IBaseBundle {
    [arg:string]:any;
}

export interface IBaseBundle {
    identifier:string;
}

export interface IBaseBundle {
    privateStorage:IBaseStorage;
    publicStorage:IBaseStorage;
}

export interface IBaseBundle {
    constructor(id:string):IBaseBundle;
}

export interface IBaseBundle {
    getAttribute:<T>(
        path:string
    ) => T;

    setAttribute:<T>(
        path:string, value:T
    ) => void;
}

export interface IBaseBundle {
    subscribeToAttribute:<T>(
        path:string,
        callback:(path:string, value:T) => void,
        on_subscribed?:Function
    ) => UUID;

    subscribeToAttributeConditional:<T>(
        path:string, condition:string|boolean|number,
        callback:(path:string, value:T) => void,
        on_subscribed?:Function
    ) => UUID;

    unsubscribeAttribute:<T>(
        uuid:UUID
    ) => void;
}

export interface IBaseBundle {
    getUpdateInformation:() => any;
    update:() => void;
}

export interface IBaseBundle {
    getDizmos:() => IBaseDizmo[];

    instantiateDizmo:(
        attributes?:object,
        publicProperties?:object,
        privateProperties?:object,
        callback?:Function
    ) => void;

    uninstall:() => void;
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export default IBaseBundle;

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
