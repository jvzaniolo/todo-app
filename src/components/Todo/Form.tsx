import type { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddIcon } from '@chakra-ui/icons';
import { Button, HStack } from '@chakra-ui/react';
import { Input } from '@layout/Input';
import { useTodo, createTodo } from '@contexts/TodoContext';

const schema = yup.object().shape({
  text: yup.string().required('Text is required'),
});

type FormValues = { text: string };

export function TodoForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValidating, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const { state, dispatch } = useTodo();

  const onSubmit: SubmitHandler<FormValues> = async data => {
    setValue('text', '');
    await createTodo(dispatch, data.text);
  };

  return (
    <HStack as="form" align="flex-start" onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="Walk the dog"
        error={errors.text}
        {...register('text')}
      />
      <Button
        w="40"
        type="submit"
        colorScheme="blue"
        leftIcon={<AddIcon />}
        textTransform="uppercase"
        isLoading={isValidating || isSubmitting}
      >
        Add todo
      </Button>
    </HStack>
  );
}
