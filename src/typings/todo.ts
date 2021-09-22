type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type Action =
  | { type: 'FETCH_TODOS'; todos: Todo[] }
  | { type: 'CREATE_TODO'; todo: Todo }
  | { type: 'TOGGLE_TODO'; id: number; completed: boolean }
  | { type: 'REMOVE_TODO'; id: number };

type State = { todos: Todo[] };

type Dispatch = (action: Action) => void;

export type { Todo, Action, State, Dispatch };
