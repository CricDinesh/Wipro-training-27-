import { EventEmitter } from "events";

class Dispatcher extends EventEmitter {
  dispatch(action) {
    this.emit("dispatch", action);
  }

  register(callback) {
    this.on("dispatch", callback);
  }
}

export default new Dispatcher();
