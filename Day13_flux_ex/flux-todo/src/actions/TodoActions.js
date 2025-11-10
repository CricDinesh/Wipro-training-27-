import Dispatcher from "../dispatcher/Dispatcher";

const TodoActions = {
  addTodo(text) {
    Dispatcher.dispatch({
      type: "ADD_TODO",
      payload: text,
    });
  },
};

export default TodoActions;
