export default defineEventHandler(async (event) => {
	const query = getQuery(event)
	await $fetch('http://localhost:3333/todos/' + query.id, {
		method: 'DELETE',
	})
})
