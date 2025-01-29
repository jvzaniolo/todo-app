import { Todo } from './todo'

async function getTodos() {
	try {
		const data = await fetch('http://localhost:3333/todos').then((res) => res.json())
		return [null, data]
	} catch (error) {
		return [error, null]
	}
}

export async function TodoList() {
	const [err, todos] = await getTodos()

	if (err) return <p>Something went wrong...</p>

	if (todos.length === 0) return <p>No todos</p>

	return (
		<ul className="space-y-4">
			{todos.map((todo: any) => (
				<Todo key={todo.id} id={todo.id} content={todo.content} isDone={todo.done} />
			))}
		</ul>
	)
}
