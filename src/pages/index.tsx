import type { NextPage } from 'next';
import { Stack, Heading } from '@chakra-ui/react';
import { TodoForm, TodoList } from '../components/Todo';
import { TodoProvider } from '../contexts/TodoContext';

const Home: NextPage = () => {
  return (
    <Stack maxW="md" mx="auto" mt="10">
      <Heading>Todo List</Heading>
      <TodoProvider>
        <TodoForm />
        <TodoList />
      </TodoProvider>
    </Stack>
  );
};

export default Home;
