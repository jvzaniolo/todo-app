import { DeleteIcon } from '@chakra-ui/icons';
import { HStack, Checkbox, IconButton } from '@chakra-ui/react';
import { useTodo } from '../../contexts/TodoContext';
import type { Action } from '../../reducers/todoReducer';
import type { Todo } from '../../types/todo';

interface TodoItemProps extends Todo {
  onToggle(
    dispatch: (action: Action) => void,
    id: number,
    completed: boolean,
  ): void;
  onDelete(dispatch: (action: Action) => void, id: number): void;
}

export function TodoItem(props: TodoItemProps) {
  const { dispatch } = useTodo();
  const { id, text, completed, onToggle, onDelete } = props;

  return (
    <HStack shadow="base" p="2" rounded="base">
      <Checkbox
        flex="1"
        isChecked={completed}
        onChange={() => onToggle(dispatch, id, !completed)}
      >
        {text}
      </Checkbox>
      <IconButton
        aria-label="Delete todo"
        icon={<DeleteIcon />}
        colorScheme="red"
        size="sm"
        onClick={() => onDelete(dispatch, id)}
      />
    </HStack>
  );
}
