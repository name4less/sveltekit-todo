<script>
	import { fetchTasks } from '$lib/util/fetchTasks';
	import { list } from '$lib/stores/colors';
	import { list as projectList } from '$lib/stores/projects';

	export let task;

	$: project = $projectList.find((project) => project.id === task.project_id);

	let projectColor;
	let isDelete = false;

	$: if (project) {
		$list?.forEach((color) => (project.color === color.id ? (projectColor = color.hex) : ''));
	} else {
		projectColor = 'gray';
	}

	// get date in MMM DD YYYY format
	const getDate = (date) => {
		const d = new Date(date);
		const month = d.getMonth() + 1;
		const day = d.getDate();
		const year = d.getFullYear();
		return `${month}/${day}/${year}`;
	};

	const removeTask = async (id) => {
		const request = await fetch('/api/task', {
			method: 'DELETE',
			body: id
		});

		if (request.status === 200) {
			fetchTasks();
		}
	};
</script>

<li
	class={`${
		isDelete ? 'opacity-0 h-0 p-0 ' : 'h-auto py-4 notCompleted'
	} transition-all overflow-hidden hover:cursor-pointer hover:bg-gray-50`}
>
	<div class="flex items-center space-x-4">
		<div class="round ml-3 flex items-center h-5">
			<input type="checkbox" id={`checkbox-${task.id}`} checked={task.completed} class="invisible" />
			<label for={`checkbox-${task.id}`} style={task.completed ? 'background-color: #66bb6a; border-color: #66bb6a;' : ''}
				><span class={task.completed ? 'checkedArrow' : ''} /></label
			>
		</div>
		<div class="flex-1 min-w-0">
			<div class="flex flex-row gap-2 items-center">
				<span style={`background-color: ${projectColor}`} class="block truncate w-2 h-2 rounded-full" />
				<p class="text-sm font-medium text-gray-900 truncate">{task.title}</p>
			</div>
			<p class="text-sm text-gray-500 truncate">{getDate(task.dueDate)}</p>
		</div>
		<div>
			<button
				on:click={() => {
					removeTask(task.id);
					isDelete = true;
				}}
				type="button"
				class="inline-flex mr-2 text-red-600 items-center p-1 border border-transparent rounded-full shadow-sm hover:text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
					/>
				</svg>
			</button>
		</div>
	</div>
</li>

<style>
</style>
