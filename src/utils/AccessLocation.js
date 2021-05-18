'use strict';
import {NativeEventEmitter, NativeModules} from 'react-native';

const LocationAccess = NativeModules.DeviceLocation;

const eventBroadcastNames = [
    'Location-Found'
];

var AndroidEventEmitter;

var _eventNames = ["getLocation"];

var _eventsHandler = new Map();
var _eventsCache = new Map();
var _listeners = [];

if (LocationAccess != null) {
    AndroidEventEmitter = new NativeEventEmitter(LocationAccess);

    for (var i = 0; i < eventBroadcastNames.length; i++) {
        var eventBroadcastName = eventBroadcastNames[i];
        var eventName = _eventNames[i];

        _listeners[eventName] = handleEventBroadcast(eventName, eventBroadcastName)
    }
}

function handleEventBroadcast(type, broadcast) {
    return AndroidEventEmitter.addListener(
        broadcast, (notification) => {
            // Check if we have added listener for this type yet
            // Cache the result first if we have not.
            var handler = _eventsHandler.get(type);

            if (handler) {
                handler(notification);
            } else {
                _eventsCache.set(type, notification);
            }
        }
    );
}


function checkIfInitialized() {
    return LocationAccess != null;
}

export default class AccessLocation {

    static addEventListener(type: any, handler: Function) {
        if (!checkIfInitialized()) return;

        // Listen to events

        _eventsHandler.set(type, handler);

        // Check if there is a cache for this type of event
        var cache = _eventsCache.get(type);
        if (handler && cache) {
            handler(cache);
            _eventsCache.delete(type);
        }
    }

    static removeEventListener(type, handler) {
        if (!checkIfInitialized()) return;

        _eventsHandler.delete(type);
    }

    static clearListeners() {
        if (!checkIfInitialized()) return;

        for (var i = 0; i < _eventNames.length; i++) {
            _listeners[_eventNames].remove();
        }
    }

 

    static getLocalityByLatLong(latitude, longitude, callback: Function) {
        if (!checkIfInitialized()) return;
        LocationAccess.getLocalityByLatLong(latitude, longitude, callback)
    }

    static requestLocation() {
        console.log(`requestLocation called`)

        if (!checkIfInitialized()) return;
        LocationAccess.requestLocation()
        console.log(`Not returen from requestLocation`)
    }

    static isLocationEnable(callback: Function) {
        if (!checkIfInitialized()) return;
        LocationAccess.isLocationEnable(callback)
    }

    static getElapsedTime(callback: Function) {
        if (!checkIfInitialized()) return;
        LocationAccess.getElapsedTime(callback)
    }

    static exitApp() {
        if (!checkIfInitialized()) return;
        LocationAccess.exitApp()
    }

  
}
