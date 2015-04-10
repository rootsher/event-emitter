(function (root) {
    'use strict';

    /**
     * 
     */
    var EventEmitter = {};

    /**
     * 
     */
    EventEmitter._eventListeners = {};

    /**
     * 
     */
    EventEmitter._maxListeners = 10;

    /**
     * 
     * @param {string} eventName 
     * @param {function} eventHandler 
     * @param {Object} [context] 
     */
    EventEmitter.on = function (eventName, eventHandler, context) {
        if ((typeof eventName !== 'string') || (eventName === '')) {
            throw new Error('EventEmitter#on: `eventName` is not a string or is empty.');
        }

        if (typeof eventHandler !== 'function') {
            throw new Error('EventEmitter#on: `eventHandler` is not a function.');
        }

        if (!this._eventListeners[eventName]) {
            this._eventListeners[eventName] = [];
        }

        this._eventListeners[eventName].push({
            eventHandler: eventHandler,
            context: (context || this)
        });

        if (this._eventListeners[eventName].length === this._maxListeners) {
            console.warn('More than %d listeners have been added to "%s" event.', this._maxListeners, eventName);
        }
    };

    /**
     * 
     * @param {string} [eventName] 
     * @param {function} [eventHandler] 
     */
    EventEmitter.off = function (eventName, eventHandler) {
        if (!eventName) {
            this._eventListeners = {};
            return;
        }

        if (!eventHandler) {
            delete this._eventListeners[eventName];
            return;
        }

        this._eventListeners[eventName] = (this._eventListeners[eventName] || []).filter(function (listener) {
            return (eventHandler !== listener.eventHandler);
        });

        if (this._eventListeners[eventName].length === 0) {
            delete this._eventListeners[eventName];
        }
    };

    /**
     * 
     * @param {string} eventName 
     * @param {function} eventHandler 
     * @param {Object} [context] 
     */
    EventEmitter.once = function (eventName, eventHandler, context) {
        if ((typeof eventName !== 'string') || (eventName === '')) {
            throw new Error('EventEmitter#once: `eventName` is not a string or is empty.');
        }

        if (typeof eventHandler !== 'function') {
            throw new Error('EventEmitter#once: `eventHandler` is not a function.');
        }

        if (!this._eventListeners[eventName]) {
            this._eventListeners[eventName] = [];
        }

        this._eventListeners[eventName].push({
            eventHandler: eventHandler,
            context: (context || this),
            once: true
        });
    };

    /**
     * 
     * @param {string} eventName 
     */
    EventEmitter.emit = function (eventName) {
        if ((typeof eventName !== 'string') || (eventName === '')) {
            throw new Error('EventEmitter#emit: `eventName` is not a string or is empty.');
        }

        if ((eventName === 'error') && (!this._eventListeners[eventName] || (this._eventListeners[eventName].length === 0))) {
            throw (arguments[1] || new Error('EventEmitter#emit: Listener for handling errors does not exist.'));
        }

        var parameters = Array.prototype.slice.call(arguments, 1);
        var remainingListeners = [];

        (this._eventListeners[eventName] || []).forEach(function (listener) {
            listener.eventHandler.apply(listener.context, parameters);

            if (!listener.once) {
                remainingListeners.push(listener);
            }
        });

        this._eventListeners[eventName] = remainingListeners;

        if (this._eventListeners[eventName].length === 0) {
            delete this._eventListeners[eventName];
        }
    };

    /**
     * 
     * @param {number} number 
     */
    EventEmitter.setMaxListeners = function (number) {
        number = Number(number);

        if (isNaN(number)) {
            throw new Error('EventEmitter#setMaxListeners: `number` is not a number.');
        }

        this._maxListeners = (parseInt(number) || Infinity);
    };

    /**
     * 
     * @param {string} eventName 
     */
    EventEmitter.getListeners = function (eventName) {
        if ((typeof eventName !== 'string') || (eventName === '')) {
            throw new Error('EventEmitter#getListeners: `eventName` is not a string or is empty.');
        }

        return (this._eventListeners[eventName] || []);
    };

    if ((typeof root.define === 'function') && root.define.amd) {
        root.define('EventEmitter', [], EventEmitter);
    } else if ((typeof root.module === 'object') && module.exports) {
        root.module.exports = EventEmitter;
    } else {
        root.EventEmitter = EventEmitter;
    }

    return EventEmitter;

}(this));