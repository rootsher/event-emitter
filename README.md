event-emitter
===========

About
-----

Event Emitter implementation.

Usage
-----

```js
var eventHandler = function (content) {
    console.log('Fire!', content);
};
```

#### emitter.on(eventName, eventHandler, [context])
##### aliases: emitter.addListener, emitter.addEventListener

```js
emitter.on('connect', eventHandler);
```

#### emitter.emit(eventName)

```js
emitter.emit('connect', {
    host: '127.0.0.1',
    port: 8080
});
```

#### emitter.once(eventName, eventHandler, [context])

```js
emitter.once('connect', eventHandler);
```

#### emitter.off([eventName], [eventHandler])
##### aliases: emitter.removeListener, emitter.removeEventListener

```js
emitter.off('connect');
```

#### emitter.removeAllListeners([eventName])

```js
emitter.removeAllListeners(eventName);
```

#### emitter.setMaxListeners(number)

```js
emitter.setMaxListeners(15);
```

#### emitter.getListeners(eventName)

```js
emitter.getListeners('connect');
```

#### emitter.hasListeners(eventName)

```js
emitter.hasListeners('connect');
```
