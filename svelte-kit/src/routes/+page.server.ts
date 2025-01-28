import { fail } from '@sveltejs/kit'
import { createTodo, deleteTodo, getTodos } from '$lib/data'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	return {
		// Streaming down the promise
		todos: getTodos(),
	}
}

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData()
		const content = data.get('content')
		if (!content) {
			return fail(422, {
				error: 'Content is required',
			})
		}
		await createTodo(String(content))
	},
	delete: async ({ request }) => {
		const data = await request.formData()
		const todoId = data.get('todoId')
		if (!todoId) {
			return { success: false, error: 'Todo ID is required' }
		}
		await deleteTodo(String(todoId))
	},
} satisfies Actions
