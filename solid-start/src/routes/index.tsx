import { createAsync, useSubmission, type RouteDefinition } from '@solidjs/router'
import { createEffect, For, Show, Suspense } from 'solid-js'
import { Todo } from '~/components/todo'
import { createTodo, getTodos } from '~/lib/data'

export const route = {
	preload: () => getTodos(),
} satisfies RouteDefinition

export default function Home() {
	const todos = createAsync(() => getTodos())
	const submission = useSubmission(createTodo)
	let formRef!: HTMLFormElement

	createEffect(() => {
		if (submission.pending) {
			formRef.reset()
		}
	})

	return (
		<main class="mx-auto max-w-sm p-16">
			<h1 class="mb-6 text-2xl font-bold">Todo App</h1>
			<form ref={formRef} action={createTodo} method="post">
				<label for="content" class="block text-sm mb-2 dark:text-neutral-400">
					Add todo
				</label>
				<input
					id="content"
					type="text"
					name="content"
					placeholder="Walk the dog"
					required
					minlength={1}
					disabled={submission.pending}
					class="px-3 py-2 border rounded-md sm:text-sm dark:border-neutral-800 w-full"
				/>
			</form>

			<Show when={submission.result?.error}>
				<p class="dark:text-red-400 text-sm mt-2 mb-4">{submission.result?.error}</p>
			</Show>

			<Suspense
				fallback={<p class="mt-6 flex justify-center text-sm italic opacity-50">Loading...</p>}
			>
				<ul class="space-y-3 mt-6">
					<For each={todos()}>
						{(todo) => (
							<Todo id={todo.id} done={todo.done}>
								{todo.content}
							</Todo>
						)}
					</For>

					<Show when={submission.pending}>
						<div classList={{ 'animate-pulse': submission.pending }}>
							<Todo id="test" done={false}>
								{submission.input?.[0].get('content')?.toString()}
								{submission.pending && (
									<span class="ml-2 text-xs italic opacity-50">Saving...</span>
								)}
							</Todo>
						</div>
					</Show>
				</ul>
			</Suspense>
		</main>
	)
}
