import { createContext, ReactNode, useContext, useReducer } from 'react';
import type { State, Dispatch } from '@typings/todo';
import { todoReducer } from '@reducers/todoReducer';

type TodoContextProps = { state: State; dispatch: Dispatch };

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

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

export { TodoProvider, useTodo };
