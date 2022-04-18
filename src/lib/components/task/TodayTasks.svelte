<script>
	import Task from './Task.svelte';
	import TaskModal from '$lib/components/modal/task/TaskModal.svelte';
	import { list } from '$lib/stores/todos';
	import { getDate } from '$lib/util/DateUtils';

	let isOpen = false;
	let taskIndex = -1;
</script>

<TaskModal {taskIndex} bind:isOpen />
<div class="">
	<ul class="-my-5 divide-y divide-gray-200 py-6">
		{#if $list?.length > 0}
			{#each $list as task, i}
				{#if getDate(task.dueDate) === 'Today'}
					<Task {task} bind:isOpen bind:taskIndex />
				{/if}
			{/each}
		{/if}
	</ul>
</div>

<style>
</style>
