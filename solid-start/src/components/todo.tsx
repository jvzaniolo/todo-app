import type { JSX } from 'solid-js'
import { useAction, useSubmission } from '@solidjs/router'
import { deleteTodo, updateTodo } from '~/lib/data'

export function Todo({ id, done, children }: { id: string; done: boolean; children: JSX.Element }) {
	const updateAction = useAction(updateTodo.with(id))
	const submission = useSubmission(deleteTodo)

	return (
		<li class="bg-neutral-900 rounded-lg px-4 dark:shadow-lg">
			<form action={deleteTodo.with(id)} method="post" class="flex items-center">
				<label class="grow flex gap-2 items-center h-12">
					<input type="checkbox" name="done" checked={done} onchange={() => updateAction(!done)} />
					<span>{children}</span>
				</label>

				<button
					class="p-2 rounded-md dark:bg-neutral-800 sm:text-sm inline-flex items-center -mx-2 disabled:opacity-50"
					disabled={submission.pending && id === submission.input[0]}
				>
					<span class="size-4">x</span>
				</button>
			</form>
		</li>
	)
}
