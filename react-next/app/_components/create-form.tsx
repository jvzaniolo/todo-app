'use client'

import { useActionState } from 'react'
import { createTodo } from '../actions'

export function CreateForm() {
	const [state, createAction, isPending] = useActionState(createTodo, null)

	return (
		<>
			<form action={createAction} className="flex gap-2 mb-8">
				<input
					type="text"
					name="content"
					placeholder="Walk the dog"
					disabled={isPending}
					required
					minLength={1}
					autoComplete="off"
					className="w-full"
				/>
				<button type="submit" disabled={isPending} className="solid whitespace-nowrap">
					{isPending ? 'Creating...' : 'Create todo'}
				</button>
			</form>
			{!state?.success && <p className="italic">{state?.error}</p>}
		</>
	)
}
