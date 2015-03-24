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

        this._eventListeners.push({
            eventName: eventName,
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
        var listenersToRemove = [];

        this._eventListeners.forEach(function (listener, index) {
            if (!eventName) {
                listenersToRemove.push(index);
                return;
            }

            if (listener.eventName !== eventName) {
                return;
            }

            if (typeof eventHandler !== 'function') {
                listenersToRemove.push(index);
                return;
            }

            if (listener.eventHandler === eventHandler) {
                listenersToRemove.push(index);
            }
        });

        this._eventListeners = this._eventListeners.filter(function (listener, index) {
            return (listenersToRemove.indexOf(index) > -1);
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

        var self = this;
        var parameters = Array.prototype.slice.call(arguments, 1);

        this._eventListeners.forEach(function (listener) {
            if (listener.eventName !== eventName) {
                return;
            }

            listener.eventHandler.apply(listener.context, parameters);

            if (listener.once) {
                self.off(eventName, listener.eventHandler);
            }
        });
    };

    return (root.EventEmitter = EventEmitter);
}(this));