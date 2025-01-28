<script lang="ts">
	import '../app.css'
	import { enhance } from '$app/forms'
	import { updateTodo } from '$lib/data'
	import type { PageProps } from './$types'

	let { data, form }: PageProps = $props()
	let newTodo = $state<string | null>(null)
	let deleting = $state<string[]>([])

	async function toggleTodo(todoId: string, done: boolean) {
		await updateTodo(todoId, done)
	}
</script>

<form
	method="POST"
	action="?/create"
	use:enhance={({ formData, formElement }) => {
		newTodo = String(formData.get('content'))
		formElement.reset()

		return async ({ update }) => {
			await update()
			newTodo = null
		}
	}}
>
	<input
		type="text"
		name="content"
		placeholder="Walk the dog"
		required
		minlength={1}
		disabled={!!newTodo}
	/>
</form>

{#if form?.error}
	<p class="text-sm text-red-400">{form.error}</p>
{/if}

{#await data.todos}
	Loading todos...
{:then todos}
	<ul>
		{#each todos.filter((todo) => !deleting.includes(todo.id)) as todo (todo.id)}
			<li>
				<form
					method="POST"
					action="?/delete"
					use:enhance={() => {
						deleting = [...deleting, todo.id]
						return async ({ update }) => {
							await update()
							deleting = deleting.filter((id) => id !== todo.id)
						}
					}}
				>
					<label>
						<input
							name="done"
							type="checkbox"
							checked={todo.done}
							onchange={() => toggleTodo(todo.id, !todo.done)}
						/>
						<span>{todo.content}</span>
					</label>
					<input type="hidden" name="todoId" value={todo.id} />
					<button aria-label="Delete todo">X</button>
				</form>
			</li>
		{/each}

		{#if newTodo}
			<li class={{ 'animate-pulse': !!newTodo }}>
				<label>
					<input id="temporary-todo" type="checkbox" />
					<span>{newTodo}</span>
				</label>
				<button aria-label="Delete todo">X</button>
			</li>
		{/if}
	</ul>
{:catch error}
	<p>error loading todos: {error.message}</p>
{/await}
