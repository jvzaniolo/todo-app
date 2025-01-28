import { Suspense } from 'react'
import { fetcher } from './fetcher'
import { Todo } from './_components/todo'
import { CreateForm } from './_components/create-form'

export const experimental_ppr = true

export default function Home() {
	return (
		<main>
			<h1>Todos</h1>

			<CreateForm />

			<Suspense fallback={<p>Loading...</p>}>
				<TodoList />
			</Suspense>
		</main>
	)
}

async function getTodos() {
	try {
		const data = await fetcher('/todos')
		return [null, data]
	} catch (error) {
		return [error, null]
	}
}

async function TodoList() {
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
