/* tslint:disable:ban-types */
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import UUID from '../util/uuid';
import IBaseBundle from './bundle';
import IBaseDizmo from './dizmo';

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export interface IBaseViewer {
    [arg:string]:any;
}

export interface IBaseViewer {
    openURL:
        () => void;
    loadMediaInfo:
        (url:string, callback:Function) => void;
}

export interface IBaseViewer {
    openPDF:
        (path:string) => string;
    closePdf:
        (id:string) => void;
    addPageToPDF:
        (id:string, options?: {
            angle: number
            height: number,
            width: number,
            x: number,
            y: number,
            zoom: number
        }) => void;
}

export interface IBaseViewer {
    getAttribute:
        <T>(path:string) => T;
    setAttribute:
        <T>(path:string, value:T) => void;
}

export interface IBaseViewer {
    subscribeToAttribute:
        <T>(path:string,
            callback:(path:string, value:T) => void,
            subscribedCallback?:Function
        ) => UUID;

    subscribeToAttributeConditional:
        <T>(path:string, condition:string|boolean|number,
            callback:(path:string, value:T) => void,
            subscribedCallback?:Function
        ) => UUID;

    unsubscribeAttribute:
        <T>(subscriptionId:UUID) => void;
}

export interface IBaseViewer {
    setPosition:
        (x:number, y:number) => void;
    getPosition:
        () => {x:number, y:number};
}

export interface IBaseViewer {
    getLanguage:
        () => string;
    activateLicense:
        (username:string, license:string) => boolean;
}

export interface IBaseViewer {
    onRemoteHostAdded:
        (callback:Function, subscribedCallback?:Function) => UUID;
    onRemoteHostRemoved:
        (callback:Function, subscribedCallback?:Function) => UUID;
    unsubscribeRemoteHost:
        (subscriptionId:UUID) => void;
}

export interface IBaseViewer {
    takeScreenshot: (
        options: Function | {
            bitmap: {
                height: number,
                width: number
            },
            geometry: {
                angle: number,
                height: number,
                width: number,
                x: number,
                y: number,
                zoom: number
            }
        },
        callback?: Function
    ) => void;
}

export interface IBaseViewer {
    transitionTo:
        (x:number, y:number, zoom:number, angle: number) => void;
    focusOnDizmo:
        (identifier:string, zoom?:number) => void;
}

export interface IBaseViewer {
    getChildDizmos:
        <T extends IBaseDizmo>() => T[];
    getDizmos:
        <T extends IBaseDizmo>() => T[];
    getDizmoById:
        <T extends IBaseDizmo>(id:string) => T;
}

export interface IBaseViewer {
    getBundles:
        <T extends IBaseBundle>() => T[];
    getBundleById:
        <T extends IBaseBundle>(id:string) => T;
}

export interface IBaseViewer {
    updatePeerList:
        () => void;
    getRemoteHosts:
        () => any[]; /* RemoteHost[] */
    getRemoteHostById:
        (id:string) => any; /* RemoteHost */
    getRemoteHostByIp:
        (ip:string) => any; /* RemoteHost */
    addRemoteHost:
        (remoteHostId:string, callback:Function) => void;
}

export interface IBaseViewer {
    startAudioRecording:
        (callback:Function) => void;
    stopAudioRecording:
        () => void;
    getAudioSettings:
        () => {sampleSize:number, sampleRate:number, codec:number};
    setAudioSettings:
        (sampleSize:number, sampleRate:number, codec:number) => void;
    recordingIsRunning:
        () => boolean;
}

export interface IBaseViewer {
    clearSetup:
        () => void;
    saveSetup:
        (name:string, id:string, password:string,
         callback?:Function, padId?:string) => void;
    loadSetup:
        (id:string, password:string,
         callback?:Function, options?:{
             clearSpace: boolean,
             loadAsPad: boolean,
             targetPad: string
         }) => void;
    changeSetupSecret:
        (id:string, oldPassword:string, newPassword:string,
         callback?:Function
        ) => void;
}

export interface IBaseViewer {
    onDizmoAdded:
        (callback:Function, subscribedCallback?:Function) => UUID;
    onDizmoRemoved:
        (callback:Function, subscribedCallback?:Function) => UUID;
    unsubscribeDizmoChanges:
        (subscriptionId:UUID) => void;
}

export interface IBaseViewer {
    installBundle:
        (bundleURI:string, callback:Function) => void;
    installStoreBundle:
        (bundleId:string, version:string, callback:Function) => void;
}

export interface IBaseViewer {
    onBundleAdded:
        (callback:Function, subscribedCallback?:Function) => UUID;
    onBundleRemoved:
        (callback:Function, subscribedCallback?:Function) => UUID;
    unsubscribeBundleChanges:
        (subscriptionId:UUID) => void;
}

export interface IBaseViewer {
    storeWorkspace:
        () => void;
    loadWorkspace:
        () => void;
}

export interface IBaseViewer {
    notify:
        (options: {
            title:string,
            button_1?:string,
            button_2?:string,
            callback?:Function,
            closable?:boolean,
            color?:string,
            data?:object,
            icon?:string,
            opacity?:number,
            sub_title?:string,
            text?:string,
            timeout?:number,
            path?:string,
            important?:boolean
        }) => void;
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export default IBaseViewer;

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
