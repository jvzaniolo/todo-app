<script lang="ts">
	import { enhance } from '$app/forms'
	import { updateTodo } from '$lib/data'

	let { id, done, content } = $props()

	let deleting = $state(false)
</script>

<li>
	<form
		method="POST"
		action="?/delete"
		use:enhance={() => {
			deleting = true
			return async ({ update }) => {
				await update()
				deleting = false
			}
		}}
	>
		<label>
			<input name="done" type="checkbox" checked={done} onchange={() => updateTodo(id, !done)} />
			<span>{content}</span>
		</label>
		<input type="hidden" name="todoId" value={id} />
		<button aria-label="Delete todo" disabled={deleting}>X</button>
	</form>
</li>
