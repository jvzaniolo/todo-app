import type { State, Action } from '@typings/todo';

export function todoReducer(state: State, action: Action) {
  switch (action.type) {
    case 'FETCH_TODOS': {
      return {
        todos: action.todos,
      };
    }
    case 'CREATE_TODO': {
      return {
        todos: [...state.todos, action.todo],
      };
    }
    case 'TOGGLE_TODO': {
      return {
        todos: state.todos.map(todo =>
          todo.id === action.id
            ? { ...todo, completed: action.completed }
            : todo,
        ),
      };
    }
    case 'REMOVE_TODO': {
      return {
        todos: state.todos.filter(todo => todo.id !== action.id),
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action['type']}`);
    }
  }
}
