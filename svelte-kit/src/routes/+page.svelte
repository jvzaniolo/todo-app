<script lang="ts">
	import '../app.css'
	import { enhance } from '$app/forms'
	import type { PageProps } from './$types'
	import Todo from './todo.svelte'

	let { data, form }: PageProps = $props()
	let newTodo = $state<string | null>(null)
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
		{#each todos as todo (todo.id)}
			<Todo id={todo.id} content={todo.content} done={todo.done} />
		{/each}

		{#if newTodo}
			<div class={{ 'animate-pulse': !!newTodo }}>
				<Todo id="temporary" content={newTodo} done={false} />
			</div>
		{/if}
	</ul>
{:catch error}
	<p>error loading todos: {error.message}</p>
{/await}
