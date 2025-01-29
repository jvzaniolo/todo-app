// place files you want to import through the `$lib` alias in this folder.
interface Todo {
	id: string
	content: string
	done: boolean
}

export async function getTodos() {
	const res = await fetch('http://localhost:3333/todos')
	const data: Todo[] = await res.json()
	return data
}

export async function createTodo(content: string) {
	await new Promise((resolve) => setTimeout(resolve, 2000))
	const res = await fetch('http://localhost:3333/todos', {
		method: 'POST',
		body: JSON.stringify({
			content,
			done: false,
		}),
	})
	const data: Todo = await res.json()
	return data
}

export async function deleteTodo(todoId: string) {
	await fetch('http://localhost:3333/todos/' + todoId, {
		method: 'DELETE',
	})
}

export async function updateTodo(todoId: string, done: boolean) {
	const res = await fetch('http://localhost:3333/todos/' + todoId, {
		method: 'PATCH',
		body: JSON.stringify({ done }),
	})
	const data: Todo = await res.json()
	return data
}
