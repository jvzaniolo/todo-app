'use client'

import { useOptimistic, startTransition, useActionState } from 'react'
import { toggleTodo, deleteTodo } from '@/lib/server/actions'
import { Trash } from './trash'

export function Todo({ id, content, isDone }: { id: string; content: string; isDone: boolean }) {
	const [optimisticDone, toggleOptimistic] = useOptimistic(isDone)
	const [, deleteAction, isPending] = useActionState(deleteTodo, null)

	return (
		<form className="py-2 pl-4 pr-2 rounded-lg shadow-lg flex gap-4 items-center border-zinc-800 border hover:border-zinc-600 has-checked:opacity-50">
			<input type="hidden" name="todoId" value={id} />
			<input
				id={id}
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
			<label htmlFor={id} className="grow peer-checked:line-through">
				{content}
			</label>
			<button
				formAction={deleteAction}
				className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-md disabled:opacity-50"
				disabled={isPending}
			>
				<Trash />
			</button>
		</form>
	)
}
