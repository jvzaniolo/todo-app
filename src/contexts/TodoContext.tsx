import { createContext, useContext, useMemo, useReducer } from 'react';
import { State, Action } from '../reducers/todoReducer';
import { fetcher } from '../services/axios';
import { todoReducer, initialTodoValue } from '../reducers/todoReducer';

type TodoContextProps = {
  state: State;
  dispatch: (action: Action) => void;
};
type TodoProviderProps = { children: React.ReactNode };

async function fetchTodos(dispatch: (action: Action) => void) {
  const { data } = await fetcher.get('/todos');

  dispatch({ type: 'FETCH_TODOS', todos: data });
}

async function createTodo(dispatch: (action: Action) => void, text: string) {
  const { data } = await fetcher.post('/todos', { text });

  dispatch({ type: 'CREATE_TODO', todo: data });
}

async function toggleTodo(
  dispatch: (action: Action) => void,
  id: number,
  completed: boolean,
) {
  await fetcher.patch(`/todos/${id}`, { completed });

  dispatch({ type: 'TOGGLE_TODO', id, completed });
}

async function removeTodo(dispatch: (action: Action) => void, id: number) {
  await fetcher.delete(`/todos/${id}`);

  dispatch({ type: 'REMOVE_TODO', id });
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

function TodoProvider({ children }: TodoProviderProps) {
  const [state, dispatch] = useReducer(todoReducer, initialTodoValue);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

function useTodo() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }

  return context;
}

export {
  TodoProvider,
  useTodo,
  fetchTodos,
  createTodo,
  toggleTodo,
  removeTodo,
};
