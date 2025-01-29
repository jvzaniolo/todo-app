import { Suspense } from 'react'
import { TodoList } from '@/components/todo-list'
import { CreateForm } from '@/components/create-form'

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
