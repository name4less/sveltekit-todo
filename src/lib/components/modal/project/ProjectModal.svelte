<script>
	import { Dialog, DialogOverlay } from '@rgossiaux/svelte-headlessui';
	import { fetchProjects } from '$lib/util/fetchProjects';
	import { list } from '$lib/stores/projects';
	import ColorsSelect from './ColorsSelect.svelte';
	import { PopoverGroup } from '@rgossiaux/svelte-headlessui';

	export let isOpen = false;

	$: errorMessage = '';

	$: project = {
		title: '',
		color: 12
	};

	$: selected = { id: 12, name: 'Gray', hex: '#bfbfbf' };

	const addProject = async (project) => {
		const request = await fetch('/api/project', {
			method: 'POST',
			body: JSON.stringify(project)
		});

		if (request.status === 201) {
			fetchProjects();
		}
	};

	function openForm() {
		project.title = '';
		selected = { id: 12, name: 'Gray', hex: '#bfbfbf' };
		errorMessage = '';
		isOpen = false;
	}

	const showErrorMessage = () => {
		errorMessage = 'Project alredy exists';
	};

	const submitProject = () => {
		if (project.title.length > 0) {
			let isProjectExist = false;
			$list.forEach((projectExist) => {
				if (projectExist.title.toLowerCase() === project.title.toLowerCase()) {
					isProjectExist = true;
				}
			});
			project.color = selected.id;
			if (isProjectExist) {
				showErrorMessage();
			} else {
				addProject(project);
				openForm();
			}
		}
	};
</script>

<Dialog
	as="div"
	class="fixed z-10 inset-0 overflow-y-auto"
	open={isOpen}
	on:close={(e) => {
		isOpen = e.detail;
		openForm();
	}}
>
	<div class="min-h-screen pt-4 px-4 pb-20 text-center block p-0">
		<DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
		<span class="inline-block sm:align-middle sm:h-screen" aria-hidden="true"> &#8203; </span>
		<div
			class="inline-block bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all mt-48 align-top max-w-sm w-full sm:p-6"
		>
			<div>
				<p>Add Project</p>
			</div>
			<div class="block absolute top-0 right-0 pt-4 pr-4">
				<button
					on:click={openForm}
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
			<div class="my-6">
				<div>
					<label for="projectTitle" class=" block text-sm font-bold text-gray-700 mb-1 ml-1">Name</label>
					<input
						type="text"
						name="projectTitle"
						id="project_title"
						autocomplete="off"
						on:input={() => {
							errorMessage = '';
						}}
						bind:value={project.title}
						class="focus:ring-indigo-500 focus:border-indigo-500 block w-full p-1 text-sm border border-gray-300 rounded-md"
						placeholder="Try Work Tasks"
					/>
					<p class="text-sm text-red-500 mt-1">{errorMessage}</p>
				</div>
				<PopoverGroup class="flex flex-row w-full pt-4 pb-8">
					<ColorsSelect bind:selected />
				</PopoverGroup>
			</div>

			<div class="flex flex-row justify-end w-full gap-2 mt-2">
				<button
					type="button"
					disabled={project.title.length < 1}
					on:click={submitProject}
					class={`${
						project.title.length < 1 ? 'bg-red-100 text-gray-700' : 'bg-red-400 hover:bg-red-300 text-white'
					} inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
				>
					Add project
				</button>
				<button
					type="button"
					on:click={openForm}
					class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Cancel
				</button>
			</div>
		</div>
	</div>
</Dialog>

<style>
</style>
