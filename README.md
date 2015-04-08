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

```js
emitter.off('connect');
```

#### emitter.setMaxListeners(number)

```js
emitter.setMaxListeners(15);
```


#### emitter.getListeners(eventName)

```js
emitter.getListeners('connect');
```
