<script>
	import ManageTask from './ManageTask/ManageTask.svelte';
	import { fetchTasks } from '$lib/util/fetchTasks';
	import { setTime, setMidnightTime } from '$lib/util/DateUtils';
	import { list } from '$lib/stores/projects';
	import { page } from '$app/stores';

	$: projectList = $list;
	$: pageUrl = $page.url.pathname;
	$: urlList = pageUrl.split('/');
	$: pageTitle = urlList[urlList.length - 1];

	let projectID = -1;

	$: if (projectList) {
		projectList.forEach((project) => (project.title === pageTitle ? (projectID = project.id) : ''));
	}

	$: task = {
		title: '',
		description: '',
		dueDate: new Date(),
		time: new Date(),
		project_id: -1,
		completed: false
	};

	$: selected = {
		title: projectList.filter((project) => project.title === pageTitle).length ? pageTitle : 'Inbox',
		project_id: projectID
	};

	$: insertingTime = false;

	const addTask = async (task) => {
		const request = await fetch('/api/task', {
			method: 'POST',
			body: JSON.stringify({ task })
		});

		if (request.status === 201) {
			fetchTasks();
		}
	};

	function submitTask() {
		if (insertingTime) {
			const taskDateTime = setTime(task.dueDate, task.time);
			task.dueDate = new Date(taskDateTime);
			delete task['allDay'];
		} else {
			Object.assign(task, { allDay: true });
			task.dueDate = setMidnightTime(task.dueDate);
		}

		if (task.title.length > 0) {
			addTask(task);
		}

		openForm();
	}

	function openForm() {
		isToggled = true;
		task.title = '';
		task.description = '';
		task.project_id = -1;
		task.dueDate = new Date();
		task.time = new Date();
		insertingTime = false;
		selected = {
			title: projectList.filter((project) => project.title === pageTitle).length ? pageTitle : 'Inbox',
			project_id: projectID
		};
	}

	let isToggled = false;
</script>

{#if !isToggled}
	<button
		type="button"
		on:click={openForm}
		class="inline-flex items-center py-1 px-2 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
	>
		<!-- Heroicon name: solid/plus-sm -->
		<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
			<path
				fill-rule="evenodd"
				d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
				clip-rule="evenodd"
			/>
		</svg>
		<span class="text-xs">Add task</span>
	</button>
{:else}
	<ManageTask bind:task bind:insertingTime bind:selected />

	<div class="flex flex-row w-full gap-2 mt-2">
		<button
			type="button"
			disabled={task.title.length < 1}
			on:click={submitTask}
			class={`${
				task.title.length < 1 ? 'bg-red-100 text-gray-700' : 'bg-red-400 hover:bg-red-300 text-white'
			} inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
		>
			Add task
		</button>
		<button
			type="button"
			on:click={() => (isToggled = false)}
			class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>
			Cancel
		</button>
	</div>
{/if}

<style>
</style>
