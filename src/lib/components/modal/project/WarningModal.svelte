<script>
	import { Dialog, DialogOverlay } from '@rgossiaux/svelte-headlessui';
	import { fetchProjects } from '$lib/util/fetchProjects';
	import { fetchTasks } from '$lib/util/fetchTasks';

	import { list } from '$lib/stores/todos';

	export let projectIndex = -1;
	export let isOpenWarning = false;

	const tasks = $list.filter((task) => task.project_id === projectIndex);

	const removeTask = async (taskId) => {
		const request = await fetch('/api/task', {
			method: 'DELETE',
			body: taskId
		});

		if (request.status === 200) {
			fetchTasks();
		}
	};

	const removeProject = async (id) => {
		const request = await fetch('/api/project', {
			method: 'DELETE',
			body: id
		});

		if (request.status === 200) {
			fetchProjects();
		}
	};

	const handleSubmit = (id) => {
		removeProject(projectIndex);

		tasks.forEach((task) => {
			removeTask(task.id);
		});

		cancelWarning();
	};

	const cancelWarning = () => {
		isOpenWarning = false;
	};
</script>

<Dialog
	as="div"
	class="fixed z-10 inset-0 overflow-y-auto"
	open={isOpenWarning}
	on:close={(e) => {
		isOpenWarning = e.detail;
		cancelWarning();
	}}
>
	<div class="min-h-screen pt-4 px-4 pb-20 text-center block p-0">
		<DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
		<span class="inline-block sm:align-middle sm:h-screen" aria-hidden="true"> &#8203; </span>
		<div
			class="inline-block bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all align-top mt-48 max-w-sm w-full sm:p-6"
		>
			<div class="block absolute top-0 right-0 pt-4 pr-4">
				<button
					on:click={cancelWarning}
					type="button"
					class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					<span class="sr-only">Close</span>
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
			<div class="flex flex-col gap-2 pt-8 pb-2 text-center text-sm">
				<p>Are you sure you wish to remove this project?</p>
				<p class="text-red-500">All tasks will be deleted</p>
			</div>

			<div class="flex flex-row justify-end w-full gap-2 mt-2">
				<button
					type="submit"
					on:click={() => {
						handleSubmit(projectIndex);
					}}
					class="bg-red-400 hover:bg-red-300 text-white inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Yes
				</button>
				<button
					type="button"
					on:click={cancelWarning}
					class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Cancel
				</button>
			</div>
		</div>
	</div>
</Dialog>
