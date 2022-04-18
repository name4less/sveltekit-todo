<script>
	import { Dialog, DialogOverlay } from '@rgossiaux/svelte-headlessui';
	import { list } from '$lib/stores/todos';
	import { list as projectList } from '$lib/stores/projects';
	import { list as colorList } from '$lib/stores/colors';
	import EditModal from './EditModal.svelte';
	import { fetchTasks } from '$lib/util/fetchTasks';

	export let isOpen = false;
	export let taskIndex = -1;

	$: task = $list.find((listItem) => listItem.id === taskIndex);

	let projectColor;

	const getProject = (task) => {
		return $projectList.find((project) => project.id === task.project_id);
	};

	const getProjectColor = (task) => {
		let project_color = '';
		let project = getProject(task);

		if (project) {
			$colorList?.forEach((color) => (project.color === color.id ? (project_color = color.hex) : ''));
		} else {
			project_color = 'gray';
		}
		return project_color;
	};

	$: isOpen ? (projectColor = getProjectColor(task)) : '';

	let isToggled = false;

	const updateTaskState = async (task) => {
		task.completed = !task.completed;
		const request = await fetch('/api/task', {
			method: 'PUT',
			body: JSON.stringify(task)
		});

		if (request.status === 200) {
			fetchTasks();
		}
	};
</script>

<Dialog
	as="div"
	class="fixed z-10 inset-0 overflow-y-auto"
	open={isOpen}
	on:close={(e) => {
		isOpen = e.detail;
		isToggled = false;
	}}
>
	<div class="min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
		<DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
		<span class="inline-block sm:align-middle sm:h-screen" aria-hidden="true"> &#8203; </span>
		<div
			class="inline-block bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all align-top mt-48 max-w-lg w-full sm:p-6"
		>
			<div class="flex flex-row items-center gap-4 pl-4">
				<span style={`background-color: ${projectColor}`} class="block truncate w-2 h-2 rounded-full" />
				<p>{getProject(task)?.title || 'Inbox'}</p>
			</div>
			<div class="block absolute top-0 right-0 pt-4 pr-4">
				<button
					on:click={() => {
						isOpen = false;
						isToggled = false;
					}}
					type="button"
					class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					<span class="sr-only">Close</span>
					<!-- Heroicon name: outline/x -->
					<svg
						class="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			{#if !isToggled}
				<div class="dialogBox flex items-start">
					<div class="round mx-auto flex-shrink-0 flex items-center justify-center h-12 w-10">
						<input
							on:click={() => {
								updateTaskState(task);
							}}
							type="checkbox"
							id={`checkbox-${task.id}`}
							checked={task?.completed}
							class="invisible"
						/>
						<label for={`checkbox-${task.id}`} style={task.completed ? 'background-color: #66bb6a; border-color: #66bb6a;' : ''}
							><span class={task.completed ? 'checkedArrow' : ''} /></label
						>
					</div>
					<div class="mt-3 w-full text-left ">
						<div
							on:click={() => {
								isToggled = true;
							}}
						>
							<h3 class={`text-lg leading-6 text-gray-900 font-bold`} id="modal-title">
								{task?.title}
							</h3>
							<div class="mt-2">
								<p class={`text-sm  text-gray-500`}>
									{task?.description}
								</p>
							</div>
						</div>
					</div>
				</div>
			{:else}
				<EditModal bind:isToggled bind:task />
			{/if}
		</div>
	</div></Dialog
>

<style>
</style>
