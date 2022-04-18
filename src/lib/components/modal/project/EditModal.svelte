<script>
	import { Dialog, DialogOverlay } from '@rgossiaux/svelte-headlessui';
	import { fetchProjects } from '$lib/util/fetchProjects';
	import { list } from '$lib/stores/projects';
	import { list as colorList } from '$lib/stores/colors';
	import ColorsSelect from './ColorsSelect.svelte';
	import { PopoverGroup } from '@rgossiaux/svelte-headlessui';

	export let isOpenModal = false;
	export let projectIndex = -1;

	let project;
	let projectTitle;
	let selected;

	$: isOpenModal ? openModal() : '';

	const openModal = async () => {
		const findProject = await $list.find((projectItem) => projectItem.id === projectIndex);

		if (findProject) {
			project = findProject;
			$colorList.forEach((color) => {
				if (project.color === color.id) {
					selected = Object.assign({}, color);
				}
			});
			projectTitle = project.title || '';
		}
	};

	const updateProject = async () => {
		if (!project) return;
		const projectToUpdate = {
			id: project.id,
			title: projectTitle,
			color: selected.id
		};

		const request = await fetch('/api/project', {
			method: 'PUT',
			body: JSON.stringify(projectToUpdate)
		});

		if (request.status === 200) {
			fetchProjects();
		}
	};

	function cancelForm() {
		projectTitle = project.title;
		$colorList.forEach((color) => {
			if (project.color === color.id) {
				selected = Object.assign({}, color);
			}
		});
		isOpenModal = false;
	}

	const submitProject = () => {
		if (projectTitle.length > 0) {
			updateProject();
			cancelForm();
		}
	};
</script>

<Dialog
	as="div"
	class="fixed z-10 inset-0 overflow-y-auto"
	open={isOpenModal}
	on:close={(e) => {
		isOpenModal = e.detail;
		cancelForm();
	}}
>
	<div class="min-h-screen pt-4 px-4 pb-20 text-center block p-0">
		<DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
		<span class="inline-block sm:align-middle sm:h-screen" aria-hidden="true"> &#8203; </span>
		<form
			on:submit|preventDefault={submitProject}
			class="inline-block bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all mt-48 align-top max-w-sm w-full sm:p-6"
		>
			<div>
				<p>Edit Project</p>
			</div>
			<div class="block absolute top-0 right-0 pt-4 pr-4">
				<button
					on:click={cancelForm}
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
						name="title"
						id="project_title"
						autocomplete="off"
						bind:value={projectTitle}
						class="focus:ring-indigo-500 focus:border-indigo-500 block w-full p-1 text-sm border border-gray-300 rounded-md"
						placeholder="Try Work Tasks"
					/>
				</div>
				<PopoverGroup class="flex flex-row w-full pt-4 pb-8">
					<ColorsSelect bind:selected />
				</PopoverGroup>
			</div>

			<div class="flex flex-row justify-end w-full gap-2 mt-2">
				<button
					type="submit"
					disabled={projectTitle?.length < 1}
					class={`${
						projectTitle?.length < 1 ? 'bg-red-100 text-gray-700' : 'bg-red-400 hover:bg-red-300 text-white'
					} inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
				>
					Save
				</button>
				<button
					type="button"
					on:click={cancelForm}
					class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Cancel
				</button>
			</div>
		</form>
	</div>
</Dialog>

<style>
</style>
