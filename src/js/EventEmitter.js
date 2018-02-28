/**
 * Event emitter class.
 * Allows adding of event listeners (with on/off) which will be fired on emit call.
 */
export default class EventEmitter {
  constructor () {
    this.listeners = {};
  }

  on (type, handler) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(handler);
  }

  off (type, handler) {
    if (!this.listeners[type]) {
      return null;
    }
    let index = this.listeners[type].indexOf(handler);
    if (index < 0) {
      return null;
    }

    this.listeners.splice(index, 1);
  }

  emit (type, ...args) {
    if (!this.listeners[type]) {
      return null;
    }

    this.listeners[type].forEach((listener) => {
      listener(...args);
    });
  }
}
