import { EventEmitter } from "events";
import Dispatcher from "../dispatcher/Dispatcher";

class TodoStore extends EventEmitter {
  constructor() {
    super();
    this.todos = [];

    Dispatcher.register((action) => {
      switch (action.type) {
        case "ADD_TODO":
          this.addTodo(action.payload);
          break;
        default:
          break;
      }
    });
  }

  addTodo(text) {
    const newTodo = { id: Date.now(), text };
    this.todos.push(newTodo);
    this.emit("change");
  }

  getAll() {
    return this.todos;
  }
}

export default new TodoStore();
