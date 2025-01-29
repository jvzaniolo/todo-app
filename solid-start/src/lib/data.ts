import { action, query } from '@solidjs/router'

interface Todo {
	id: string
	content: string
	done: boolean
}

export const getTodos = query(async () => {
	'use server'
	const response = await fetch('http://localhost:3333/todos')
	return (await response.json()) as Todo[]
}, 'todos')

export const createTodo = action(async (formData: FormData) => {
	'use server'
	const content = formData.get('content') as string

	if (!content || content.length === 0) {
		return { error: 'Content is required' }
	}

	await fetch('http://localhost:3333/todos', {
		method: 'POST',
		body: JSON.stringify({
			content,
			done: false,
		}),
	})
}, 'createTodo')

export const deleteTodo = action(async (todoId: string) => {
	'use server'
	await fetch('http://localhost:3333/todos/' + todoId, {
		method: 'DELETE',
	})
}, 'deleteTodo')

export const updateTodo = action(async (todoId: string, done: boolean) => {
	'use server'
	await fetch('http://localhost:3333/todos/' + todoId, {
		method: 'PATCH',
		body: JSON.stringify({ done }),
	})
}, 'updateTodo')
