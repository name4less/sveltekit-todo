<script>
	import TaskModal from '$lib/components/modal/task/TaskModal.svelte';
	import Task from './Task.svelte';
	import { list } from '$lib/stores/todos';

	let isOpen = false;
	let taskIndex = -1;

	$: sortedTasks = $list.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
	$: overdueTasks = sortedTasks.filter((a) => new Date(a.dueDate) < new Date());
	$: tasks = sortedTasks.filter((a) => new Date(a.dueDate) >= new Date());
</script>

<TaskModal {taskIndex} bind:isOpen />
{#if overdueTasks?.length > 0}
	<div>
		<p class="pt-8 pl-4 font-bold">Overdue Tasks</p>
		<ul class="-my-5 divide-y divide-gray-200 py-6">
			{#each overdueTasks as task, i}
				<Task {task} bind:isOpen bind:taskIndex />
			{/each}
		</ul>
	</div>
{/if}
<div class="">
	<p class="pt-8 pl-4 font-bold">Current Tasks</p>
	<ul class="-my-5 divide-y divide-gray-200 py-6">
		{#if tasks?.length > 0}
			{#each tasks as task, i}
				<Task {task} bind:isOpen bind:taskIndex />
			{/each}
		{/if}
	</ul>
</div>

<style>
</style>
