import type { Todo } from '~/types/todo'

export default defineEventHandler(async () => {
	const data: Todo[] = await $fetch('http://localhost:3333/todos')
	return data
})
