<script>
	import ProjectMenu from './ProjectMenu.svelte';
	import { list } from '$lib/stores/colors';

	export let project = null;
	export let i;
	export let openMobileNav = 'hide';
	export let projectIndex = -1;
	export let isOpenModal = false;
	export let isOpenWarning = false;

	$: openMenu = false;

	$: hover = [];

	const getProjectColor = (project) => {
		let project_color = '';
		$list?.forEach((color) => (project.color === color.id ? (project_color = color.hex) : ''));
		return project_color;
	};

	$: projectColor = getProjectColor(project);

	const showButton = (i) => {
		hover[i] = 'visible';
	};

	const hideButton = (i) => {
		hover[i] = 'invisible';
	};
</script>

<li
	on:mouseover={() => {
		showButton(i);
	}}
	on:mouseleave={() => {
		hideButton(i);
	}}
	class={` ${
		openMenu ? 'bg-gray-600 text-white' : ''
	} flex flex-row items-center text-gray-300 rounded-md px-2 py-2 hover:bg-gray-600 hover:text-white`}
>
	<a
		href={`/app/projects/${project.title}`}
		on:click={() => {
			openMobileNav = 'hide';
		}}
		class="w-full group flex gap-4 items-center text-gray-300 text-sm font-medium "
		><span style={`background-color: ${projectColor}`} class="block truncate w-2 h-2 rounded-full" />
		<span>{project.title}</span>
	</a>
	<ProjectMenu {i} {hover} bind:openMenu bind:projectIndex bind:isOpenModal bind:isOpenWarning projectId={project.id} />
</li>
