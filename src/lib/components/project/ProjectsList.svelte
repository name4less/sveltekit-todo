<script>
	import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from '@rgossiaux/svelte-headlessui';
	import { list } from '$lib/stores/projects';
	import IconChevronRight from '$lib/components/icon/IconChevronRight.svelte';
	import AddProjectBtn from './AddButton.svelte';
	import ProjectItem from './ProjectItem.svelte';
	import EditModal from '$lib/components/modal/project/EditModal.svelte';
	import WarningModal from '$lib/components/modal/project/WarningModal.svelte';

	export let openMobileNav = 'hide';

	$: isOpenModal || isOpenWarning ? (openMobileNav = 'hide') : '';

	let isOpenModal = false;
	let isOpenWarning = false;
	let projectIndex = -1;
</script>

{#if projectIndex > 0}
	<EditModal bind:isOpenModal {projectIndex} />
	<WarningModal bind:isOpenWarning {projectIndex} />
{/if}

<div class="relative w-full">
	<AddProjectBtn bind:openMobileNav />
	<Disclosure let:open>
		<DisclosureButton class="flex flex-row items-center pl-1">
			<IconChevronRight
				classes={`${open ? 'rotate-90 ' : ''} text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-4 w-4`}
			/>
			<p class="pl-1">Projects</p>
		</DisclosureButton>

		<Transition
			enter="transition duration-100 ease-out"
			enterFrom="transform scale-95 opacity-0"
			enterTo="transform scale-100 opacity-100"
			leave="transition duration-75 ease-out"
			leaveFrom="transform scale-100 opacity-100"
			leaveTo="transform scale-95 opacity-0"
		>
			<div class="pt-2">
				<DisclosurePanel as="ul">
					{#if $list.length > 0}
						{#each $list as project, i}
							<ProjectItem {project} {i} bind:projectIndex bind:isOpenModal bind:isOpenWarning />
						{/each}
					{/if}
				</DisclosurePanel>
			</div>
		</Transition>
	</Disclosure>
</div>
