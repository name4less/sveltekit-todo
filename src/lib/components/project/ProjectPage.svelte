<script>
	import TaskModal from '$lib/components/modal/task/TaskModal.svelte';
	import Task from '$lib/components/task/Task.svelte';
	import { list } from '$lib/stores/todos';
	import AddTask from '$lib/components/task/AddTask.svelte';
	import { list as projectList } from '$lib/stores/projects';
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';

	export let projectTitle = '';
	let isOpen = false;
	let taskIndex = -1;

	$: if (browser) {
		const isProjectTitle = $projectList?.find((project) => project.title === projectTitle);
		isProjectTitle ? '' : goto('/');
	}

	const getProjectId = (projectTitle) => {
		let projectId = -1;
		$projectList?.forEach((project) => (project.title === projectTitle ? (projectId = project.id) : ''));
		return projectId;
	};

	$: projectId = getProjectId(projectTitle) > 0 ? getProjectId(projectTitle) : 'Inbox';

	$: sortedTasks = $list.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
	$: overdueTasks = sortedTasks.filter((a) => new Date(a.dueDate) < new Date() && a.project_id === getProjectId(projectTitle));
	$: tasks = sortedTasks.filter((a) => new Date(a.dueDate) >= new Date() && a.project_id === projectId);
</script>

<TaskModal {taskIndex} bind:isOpen />
<div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
	<h1 class="text-2xl font-semibold text-gray-900">{projectTitle}</h1>
</div>
<div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
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
	{#if tasks?.length > 0}
		<div class="">
			<p class="pt-8 pl-4 font-bold">Current Tasks</p>
			<ul class="-my-5 divide-y divide-gray-200 py-6">
				{#each tasks as task, i}
					<Task {task} bind:isOpen bind:taskIndex />
				{/each}
			</ul>
		</div>
	{/if}
	<div class="pt-4">
		<AddTask />
	</div>
</div>

<style>
</style>
