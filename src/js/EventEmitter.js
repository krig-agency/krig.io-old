/**
 * Event emitter class.
 * Allows adding of event listeners (with on/off/once) which will be fired on emit call.
 */
export default class EventEmitter {
  constructor () {
    this.listeners = {};
  }

  /**
   * Attach a listener to a given event.
   * @param {string} type Event type.
   * @param {function} handler Callback to fire.
   * @return {EventEmitter} this
   */
  on (type, handler) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(handler);
    return this;
  }

  /**
   * Attach a listener to a given event. The listener will be removed when the event is fired.
   * @param {string} type Event type
   * @param {function} handler Callback to fire.
   * @return {EventEmitter} this
   */
  once (type, handler) {
    let inner = (...args) => {
      handler(...args);
      this.off(type, inner);
    };

    this.on(type, inner.bind(this));
  }

  /**
   * Remove a given handler from a event.
   * @param {string} type Event type.
   * @param {function} handler Handler to remove.
   * @return {EventEmitter} this
   */
  off (type, handler) {
    if (!this.listeners[type]) {
      throw new Error(`No listener exists on the ${type} event.`);
    }

    let index = this.listeners[type].indexOf(handler);
    if (index < 0) {
      throw new Error(`The provided handler for the ${type} event did not exist.`);
    }

    this.listeners.splice(index, 1);
    return this;
  }

  /**
   * Emit a given event.
   * @param {string} type Event type.
   * @param {...} args Arguments.
   * @return {EventEmitter}
   */
  emit (type, ...args) {
    if (this.listeners[type].length > 0) {
      this.listeners[type].forEach((listener) => {
        listener(...args);
      });
    }
    return this;
  }
}
