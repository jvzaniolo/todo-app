import type { NextPage } from 'next';
import { Stack, Heading } from '@chakra-ui/react';
import { TodoForm } from '../components/Todo/Form';
import { TodoList } from '../components/Todo/List';
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
