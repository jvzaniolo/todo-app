import type { Todo } from '~/types/todo'

export default defineEventHandler(async (event) => {
	const { content } = await readBody(event)

	const data: Todo = await $fetch('http://localhost:3333/todos', {
		method: 'POST',
		body: { content, done: false },
	})

	return data
})
