import { fetcher } from '@services/axios';
import type { Dispatch } from '@typings/todo';

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

export { fetchTodos, createTodo, toggleTodo, removeTodo };
