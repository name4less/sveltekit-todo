<script>
	import { IconPlus } from '$lib/components/icon';
	import ProjectModal from '$lib/components/modal/project/ProjectModal.svelte';

	export let openMobileNav = 'hide';
	let isOpen = false;
</script>

<ProjectModal bind:isOpen />
<div class="absolute z-50 right-0 flex justify-center items-center">
	<button
		on:click={() => {
			isOpen = true;
			openMobileNav = 'hide';
		}}
		class="text-3xl text-gray-400 group-hover:text-gray-300 hover:bg-gray-600 rounded-full flex-shrink-0"
	>
		<IconPlus classes="w-6 h-6" />
	</button>
</div>

<style>
	div {
		top: -2px;
	}
</style>
