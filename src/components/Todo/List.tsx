import { Stack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useTodo } from '@contexts/TodoContext';
import { fetchTodos, toggleTodo, removeTodo } from '@helpers/todoHelper';
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
