import { Stack } from '@chakra-ui/react';
import { useEffect } from 'react';
import {
  useTodo,
  fetchTodos,
  toggleTodo,
  removeTodo,
} from '../../contexts/TodoContext';
import { TodoItem } from './Item';

export function TodoList() {
  const { state, dispatch } = useTodo();

  useEffect(() => {
    fetchTodos(dispatch);
  }, [dispatch]);

  return (
    <Stack>
      {state.todos?.map(todo => (
        <TodoItem
          key={todo.id}
          {...todo}
          onToggle={toggleTodo}
          onDelete={removeTodo}
        />
      ))}
    </Stack>
  );
}
