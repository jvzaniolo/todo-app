'use client'

import { useOptimistic, startTransition, useActionState } from 'react'
import { toggleTodo, deleteTodo } from '../actions'

export function Todo({ id, content, isDone }: { id: string; content: string; isDone: boolean }) {
	const inputId = `todo-${id}`
	const [optimisticDone, toggleOptimistic] = useOptimistic(isDone)

	return (
		<form className="py-2 pl-4 pr-2 rounded-lg shadow-lg flex gap-4 items-center border-zinc-800 border hover:border-zinc-600 has-checked:opacity-50">
			<input type="hidden" name="todoId" value={id} />
			<input
				id={inputId}
				type="checkbox"
				checked={optimisticDone}
				onChange={() => {
					startTransition(async () => {
						toggleOptimistic(!isDone)
						await toggleTodo(id, !isDone)
					})
				}}
				className="peer"
			/>
			<label htmlFor={inputId} className="grow peer-checked:line-through">
				{content}
			</label>
			<DeleteButton />
		</form>
	)
}

function DeleteButton() {
	const [, deleteAction, isPending] = useActionState(deleteTodo, null, '/')

	return (
		<button formAction={deleteAction} className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-md">
			{isPending ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="animate-spin"
				>
					<path d="M12 2v4" />
					<path d="m16.2 7.8 2.9-2.9" />
					<path d="M18 12h4" />
					<path d="m16.2 16.2 2.9 2.9" />
					<path d="M12 18v4" />
					<path d="m4.9 19.1 2.9-2.9" />
					<path d="M2 12h4" />
					<path d="m4.9 4.9 2.9 2.9" />
				</svg>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M3 6h18" />
					<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
					<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
					<line x1="10" x2="10" y1="11" y2="17" />
					<line x1="14" x2="14" y1="11" y2="17" />
				</svg>
			)}
		</button>
	)
}
