export async function createTodo(content: string) {
	await $fetch('/api/todo', {
		method: 'POST',
		body: { content },
	})
}

export async function deleteTodo(todoId: string) {
	await $fetch('/api/todo?id=' + todoId, {
		method: 'DELETE',
	})
}
