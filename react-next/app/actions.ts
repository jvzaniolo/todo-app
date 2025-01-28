'use server'

import { revalidatePath } from 'next/cache'
import { fetcher } from './fetcher'

export async function toggleTodo(id: string, done: boolean) {
	await new Promise((resolve) => setTimeout(resolve, 1000))
	await fetcher('/todos/' + id, {
		method: 'PATCH',
		body: JSON.stringify({ done }),
	})
	revalidatePath('/')
}

export async function createTodo(
	state: any,
	formData: FormData,
): Promise<
	| {
			success: false
			error: string
	  }
	| {
			success: true
	  }
> {
	let content = formData.get('content')

	if (!content) {
		return {
			success: false,
			error: 'Content is required',
		}
	}

	await fetcher('/todos', {
		method: 'POST',
		body: JSON.stringify({ content: String(content), done: false }),
	})

	revalidatePath('/')

	return {
		success: true,
	}
}

export async function deleteTodo(state: any, formData: FormData) {
	const id = formData.get('todoId')

	if (!id) {
		throw new Error('Id is required')
	}

	await fetcher('/todos/' + id, {
		method: 'DELETE',
	})

	revalidatePath('/')

	return null
}
