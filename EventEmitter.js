(function (root) {
    'use strict';

    /**
     * 
     */
    var EventEmitter = {};

    /**
     * 
     */
    EventEmitter._eventListeners = [];

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
    };

    /**
     * 
     * @param {string} [eventName] 
     * @param {function} [eventHandler] 
     */
    EventEmitter.off = function (eventName, eventHandler) {
        var self = this;

        this._eventListeners[eventName] = (this._eventListeners[eventName] || []).filter(function (listener, index) {
            return (eventHandler !== listener.eventHandler);
        });
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

        this._eventListeners.push({
            eventName: eventName,
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

    return (root.EventEmitter = EventEmitter);
}(this));