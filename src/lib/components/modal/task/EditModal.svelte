<script>
	import ManageTask from '$lib/components/task/ManageTask/ManageTask.svelte';
	import { fetchTasks } from '$lib/util/fetchTasks';
	import { setTime, setMidnightTime } from '$lib/util/DateUtils';
	import { list } from '$lib/stores/projects';

	export let isToggled = false;
	export let task = null;

	let changedTask = {
		id: task.id,
		title: task.title,
		description: task.description,
		dueDate: new Date(task.dueDate),
		time: new Date(task.dueDate),
		completed: task.completed,
		project_id: task.project_id
	};

	let insertingTime;

	const getTaskCategory = (task) => {
		let projectTitle = '';

		$list.forEach((project) => (task.project_id === project.id ? (projectTitle = project.title) : ''));

		return projectTitle;
	};

	let selected = { title: getTaskCategory(task).length > 0 ? getTaskCategory(task) : 'Inbox', project_id: task.project_id };

	if (task.allDay) {
		insertingTime = false;
	} else {
		insertingTime = true;
	}

	const updateTask = async (task) => {
		const request = await fetch('/api/task', {
			method: 'PUT',
			body: JSON.stringify(task)
		});

		if (request.status === 200) {
			fetchTasks();
		}
	};

	function submitTask() {
		if (insertingTime) {
			const taskDateTime = setTime(changedTask.dueDate, changedTask.time);
			changedTask.dueDate = new Date(taskDateTime);
			delete changedTask['allDay'];
		} else {
			Object.assign(changedTask, { allDay: true });
			changedTask.dueDate = setMidnightTime(changedTask.dueDate);
		}

		if (changedTask.title.length > 0) {
			updateTask(changedTask);
		}

		isToggled = false;
	}

	function cancelForm() {
		isToggled = false;
		changedTask.title = task.title;
		changedTask.description = task.description;
		changedTask.dueDate = new Date(task.dueDate);
		changedTask.time = new Date(task.time);
		changedTask.allDay = task?.allDay;
		changedTask.completed = task.completed;
		changedTask.project_id = task.project_id;
		selected = { title: getTaskCategory(task), project_id: task.project_id };
	}
</script>

<div>
	<ManageTask bind:task={changedTask} bind:insertingTime bind:selected />

	<div class="flex flex-row w-full gap-2 mt-2">
		<button
			type="button"
			disabled={task.title.length < 1}
			on:click={submitTask}
			class={`${
				task.title.length < 1 ? 'bg-red-100 text-gray-700' : 'bg-red-400 hover:bg-red-300 text-white'
			} inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
		>
			Save
		</button>
		<button
			type="button"
			on:click={() => {
				isToggled = false;
				cancelForm();
			}}
			class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>
			Cancel
		</button>
	</div>
</div>
