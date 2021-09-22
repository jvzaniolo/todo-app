import { createContext, ReactNode, useContext, useReducer } from 'react';
import type { State, Dispatch } from '@typings/todo';
import { fetcher } from '@services/axios';
import { todoReducer } from '@reducers/todoReducer';

async function fetchTodos(dispatch: Dispatch) {
  const { data } = await fetcher.get('/todos');

  dispatch({ type: 'FETCH_TODOS', todos: data });
}

async function createTodo(dispatch: Dispatch, text: string) {
  const { data } = await fetcher.post('/todos', { text });

  dispatch({ type: 'CREATE_TODO', todo: data });
}

async function toggleTodo(dispatch: Dispatch, id: number, completed: boolean) {
  await fetcher.patch(`/todos/${id}`, { completed });

  dispatch({ type: 'TOGGLE_TODO', id, completed });
}

async function removeTodo(dispatch: Dispatch, id: number) {
  await fetcher.delete(`/todos/${id}`);

  dispatch({ type: 'REMOVE_TODO', id });
}

const TodoContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, { todos: [] });

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
