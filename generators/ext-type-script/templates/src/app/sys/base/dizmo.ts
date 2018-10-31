/* tslint:disable:ban-types */
import { UUID } from '@dizmo/functions';
import IBaseBundle from './bundle';
import IBaseStorage from './storage';

export interface IBaseDizmo {
    [arg: string]: any;
}

export interface IBaseDizmo {
    identifier: string;
}

export interface IBaseDizmo {
    privateStorage: IBaseStorage;
    publicStorage: IBaseStorage;
}

export interface IBaseDizmo {
    getAttribute:
    <T>(path: string, options?: {
        values?: boolean,
        nodes?: boolean
    }) => T;

    setAttribute:
    <T>(path: string, value: T) => void;
}

export interface IBaseDizmo {
    subscribeToAttribute:
    <T>(path: string,
        callback: (path: string, value: T) => void,
        subscribedCallback?: Function
    ) => UUID;

    subscribeToAttributeConditional:
    <T>(path: string, condition: string | boolean | number,
        callback: (path: string, value: T) => void,
        subscribedCallback?: Function
    ) => UUID;

    unsubscribeAttribute:
    <T>(subscriptionId: UUID) => void;
}

export interface IBaseDizmo {
    beginUpdate:
    (path: string) => void;
    endUpdate:
    (path: string) => void;
}

export interface IBaseDizmo {
    setPosition:
    (x: number, y: number) => void;
    getPosition:
    () => { x: number, y: number };
}

export interface IBaseDizmo {
    close:
    () => void;
}

export interface IBaseDizmo {
    addMenuItem:
    (iconUri: string, text: string, callback: Function) => UUID;
    updateMenuItem:
    (menuId: UUID, iconUri: string, text: string, callback: Function) => UUID;
    removeMenuItem:
    (menuId: UUID) => void;
}

export interface IBaseDizmo {
    clone:
    (attributes?: object, callback?: Function) => void;
}

export interface IBaseDizmo {
    getAttention:
    (options: { type: string, duration: number }) => void;
}

export interface IBaseDizmo {
    getDockedDizmos:
    <T extends IBaseDizmo>() => T[];
    canDock:
    (flag: boolean | (() => boolean)) => void;
    onDock:
    (callback: Function, subscribedCallback?: Function) => void;
    onUndock:
    (callback: Function, subscribedCallback?: Function) => void;
}

export interface IBaseDizmo {
    onShow:
    (callback: Function, subscribedCallback?: Function) => UUID;
    onHide:
    (callback: Function, subscribedCallback?: Function) => UUID;
}

export interface IBaseDizmo {
    onMaximized:
    (callback: Function, subscribedCallback?: Function) => UUID;
    onIconized:
    (callback: Function, subscribedCallback?: Function) => UUID;
    onClosing:
    (callback: Function, subscribedCallback?: Function) => UUID;
    onCancelClosing:
    (callback: Function, subscribedCallback?: Function) => UUID;
    onDragStart:
    (callback: Function, subscribedCallback?: Function) => UUID;
    onDragEnd:
    (callback: Function, subscribedCallback?: Function) => UUID;
    onResizeStart:
    (callback: Function, subscribedCallback?: Function) => UUID;
    onResizeEnd:
    (callback: Function, subscribedCallback?: Function) => UUID;
    onShowBack:
    (callback: Function, subscribedCallback?: Function) => UUID;
    onShowFront:
    (callback: Function, subscribedCallback?: Function) => UUID;
}

export interface IBaseDizmo {
    showBack:
    () => void;
    showFront:
    () => void;
}

export interface IBaseDizmo {
    setSize:
    (width: number, height: number) => void;
    getSize:
    () => { width: number, height: number };
}

export interface IBaseDizmo {
    setPositionAndSize:
    (x: number, y: number, width: number, height: number) => void;
}

export interface IBaseDizmo {
    getHeight:
    () => number;
    setHeight:
    (height: number) => void;
    getWidth:
    () => number;
    setWidth:
    (width: number) => void;
}

export interface IBaseDizmo {
    focus: () => void;
}

export interface IBaseDizmo {
    getParentDizmo:
    <T extends IBaseDizmo>() => T;
    setParentDizmo:
    <T extends IBaseDizmo>(otherDizmo: T) => boolean;
}

export interface IBaseDizmo {
    getChildDizmos:
    <T extends IBaseDizmo>() => T[];
    getRootDizmo:
    <T extends IBaseDizmo>() => T;
}

export interface IBaseDizmo {
    getBundle:
    <T extends IBaseBundle>() => T;
}

export interface IBaseDizmo {
    remoteHostConnected:
    () => boolean;
    getRemoteHost:
    () => any; /* RemoteHost */
    onRemoteHostConnected:
    (callback: Function, subscribedCallback?: Function) => UUID;
    onRemoteHostDisconnected:
    (callback: Function, subscribedCallback?: Function) => UUID;
    unsubscribeRemoteHost:
    (subscriptionId: UUID) => void;
}

export interface IBaseDizmo {
    onParentChanged:
    (callback: Function, subscribedCallback?: Function) => UUID;
    unsubscribeParentChange:
    (subscriptionId: UUID) => void;
}

export interface IBaseDizmo {
    onChildrenAdded:
    (callback: Function, subscribedCallback?: Function) => UUID;
    onChildrenRemoved:
    (callback: Function, subscribedCallback?: Function) => UUID;
    unsubscribeChildren:
    (subscriptionId: UUID) => void;
}

export interface IBaseDizmo {
    share:
    (remoteHostId: string, callback?: Function) => void;
    unshare:
    (remoteHostId: string, callback?: Function) => void;
}

export interface IBaseDizmo {
    clearSetup: () => void;
}

export default IBaseDizmo;
