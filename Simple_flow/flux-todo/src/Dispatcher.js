class Dispatcher {
  constructor() {
    this.callbacks = [];
  }

  register(callback) {
    this.callbacks.push(callback);
  }

  dispatch(action) {
    console.log("[Dispatcher] Broadcasting action:", action);
    this.callbacks.forEach((callback) => callback(action));
  }
}

export default new Dispatcher();
