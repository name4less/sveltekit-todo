<script context="module">
	let tasksList = [];
	/** @type {import('@sveltejs/kit').Load} */
	export async function load() {
		const response = await fetch('http://localhost:3000/api/task', {
			method: 'GET'
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				return data;
			});
		tasksList = response;
		return {
			status: response.status,
			props: { tasksList }
		};
	}
</script>

<script>
	//import List from '$lib/components/List.svelte';
	import AddTask from '$lib/components/task/AddTask.svelte';
	import { setTodos } from '$lib/stores/todos';
	import TodayTasks from '$lib/components/task/TodayTasks.svelte';
	import { getDate } from '$lib/util/DateUtils';
	//import ListAllTodos from '$lib/components/todo/List.svelte';

	// get a string with the current date in Ddd dd Mmm format
	const date = new Date().toLocaleDateString('en-GB', {
		weekday: 'short',
		day: 'numeric',
		month: 'long'
	});

	const tasksListArr = Array.from(tasksList);
	$: setTodos(tasksListArr);
</script>

<div class="flex items-end gap-2 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
	<h1 class="text-2xl font-semibold text-gray-900">Today</h1>
	<span class="text-gray-400 text-sm">{date}</span>
</div>
<div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
	<div>
		<TodayTasks />
		<AddTask />
	</div>
</div>

<style>
</style>
