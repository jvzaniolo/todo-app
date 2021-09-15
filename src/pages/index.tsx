import type { NextPage } from 'next';
import { TodoForm } from '../components/Todo/Form';

const Home: NextPage = () => {
  return (
    <div>
      <TodoForm />
    </div>
  );
};

export default Home;
