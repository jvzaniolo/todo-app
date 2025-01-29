<script setup lang="ts">
import { ref } from 'vue'
import type { Todo } from './types/todo'
import { createTodo, deleteTodo } from './lib/data'

const { data, refresh } = await useFetch<Todo[]>('/api/todo')
const content = ref('')

async function onCreateSubmit(e: Event) {
	e.preventDefault()
	await createTodo(content.value)
	content.value = ''
	refresh()
}

async function onDelete(todoId: string) {
	await deleteTodo(todoId)
	refresh()
}
</script>

<template>
	<h1>Todo App</h1>

	<form @submit="onCreateSubmit">
		<label for="content">Add a todo</label>
		<input
			id="content"
			type="text"
			placeholder="Walk the dog"
			v-model="content"
			required
			minlength="1"
		/>
	</form>

	<ul>
		<li v-for="todo in data">
			<label :for="todo.id">
				<input type="checkbox" name="done" :id="todo.id" :checked="todo.done" />
				<span>{{ todo.content }}</span>
				<button @click="onDelete(todo.id)">x</button>
			</label>
		</li>
	</ul>
</template>
