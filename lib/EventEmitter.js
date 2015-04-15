(function (root) {
    'use strict';

    var defaultMaxListeners = 10;

    /**
     * 
     */
    function EventEmitter() {}

    /**
     * 
     * @param {string} eventName 
     * @param {function} eventHandler 
     * @param {Object} [context] 
     */
    EventEmitter.prototype.on = function on(eventName, eventHandler, context) {
        if ((typeof eventName !== 'string') || (eventName === '')) {
            throw new Error('EventEmitter#on: `eventName` is not a string or is empty.');
        }

        if (typeof eventHandler !== 'function') {
            throw new Error('EventEmitter#on: `eventHandler` is not a function.');
        }

        if (!this._eventListeners) {
            this._eventListeners = {};
        }

        if (!this._eventListeners[eventName]) {
            this._eventListeners[eventName] = [];
        }

        this._eventListeners[eventName].push({
            eventHandler: eventHandler,
            context: (context || this)
        });

        if (this._eventListeners[eventName].length === (this._maxListeners || defaultMaxListeners)) {
            console.warn('More than %d listeners have been added to "%s" event.', (this._maxListeners || defaultMaxListeners), eventName);
        }
    };

    /**
     * 
     */
    EventEmitter.prototype.addListener = EventEmitter.prototype.on;

    /**
     * 
     */
    EventEmitter.prototype.addEventListener = EventEmitter.prototype.on;

    /**
     * 
     * @param {string} [eventName] 
     * @param {function} [eventHandler] 
     */
    EventEmitter.prototype.off = function off(eventName, eventHandler) {
        if (!eventName) {
            this._eventListeners = {};
            return;
        }

        if (!eventHandler) {
            delete this._eventListeners[eventName];
            return;
        }

        if (!this._eventListeners) {
            this._eventListeners = {};
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
     */
    EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

    /**
     * 
     */
    EventEmitter.prototype.removeEventListener = EventEmitter.prototype.off;

    /**
     * 
     * @param {string} [eventName] 
     */
    EventEmitter.prototype.removeAllListeners = function (eventName) {
        if (!this._eventListeners || !this._eventListeners[eventName]) {
            this._eventListeners = {};
            return;
        }

        delete this._eventListeners[eventName];
    };

    /**
     * 
     * @param {string} eventName 
     * @param {function} eventHandler 
     * @param {Object} [context] 
     */
    EventEmitter.prototype.once = function once(eventName, eventHandler, context) {
        if ((typeof eventName !== 'string') || (eventName === '')) {
            throw new Error('EventEmitter#once: `eventName` is not a string or is empty.');
        }

        if (typeof eventHandler !== 'function') {
            throw new Error('EventEmitter#once: `eventHandler` is not a function.');
        }

        if (!this._eventListeners) {
            this._eventListeners = {};
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
    EventEmitter.prototype.emit = function emit(eventName) {
        if (!eventName) {
            throw new Error('EventEmitter#emit: `eventName` is undefined.');
        }

        if (!this._eventListeners) {
            this._eventListeners = {};
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
    EventEmitter.prototype.setMaxListeners = function setMaxListeners(number) {
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
    EventEmitter.prototype.getListeners = function getListeners(eventName) {
        if (!this._eventListeners) {
            this._eventListeners = {};
        }

        return (this._eventListeners[eventName] || []).map(function (listener) {
            return listener.eventHandler;
        });
    };

    /**
     * 
     */
    EventEmitter.prototype.listeners = EventEmitter.prototype.getListeners;

    /**
     * 
     * @param {string} eventName 
     */
    EventEmitter.prototype.hasListeners = function hasListeners(eventName) {
        if (!this._eventListeners) {
            this._eventListeners = {};
        }

        return (this._eventListeners[eventName] && Array.isArray(this._eventListeners[eventName]) && (this._eventListeners[eventName].length > 0));
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