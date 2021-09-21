import type { Todo } from '../types/todo';

export type State = { todos: Todo[]; isLoading: boolean };
export type Action =
  | { type: 'FETCH_TODOS'; todos: Todo[] }
  | { type: 'CREATE_TODO'; todo: Todo }
  | { type: 'TOGGLE_TODO'; id: number; completed: boolean }
  | { type: 'REMOVE_TODO'; id: number };

export const initialTodoValue = {
  todos: [],
  isLoading: false,
};

export function todoReducer(state: State, action: Action) {
  switch (action.type) {
    case 'FETCH_TODOS': {
      return {
        ...state,
        todos: action.todos,
      };
    }
    case 'CREATE_TODO': {
      return {
        ...state,
        todos: [...state.todos, action.todo],
      };
    }
    case 'TOGGLE_TODO': {
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id
            ? { ...todo, completed: action.completed }
            : todo,
        ),
      };
    }
    case 'REMOVE_TODO': {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action['type']}`);
    }
  }
}
