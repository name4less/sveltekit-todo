<script>
	import { Popover, PopoverPanel, PopoverButton, Transition } from '@rgossiaux/svelte-headlessui';
	import IconMenu from '$lib/components/icon/IconMenu.svelte';
	import IconTrash from '../icon/IconTrash.svelte';
	import IconEdit from '../icon/IconEdit.svelte';

	export let hover, i;
	export let projectIndex = -1;
	export let projectId = -1;
	export let openMenu = false;
	export let isOpenModal = false;
	export let isOpenWarning = false;

	$: showButton = 'invisible';

	$: isShowButton = (event) => {
		if (event) {
			showButton = 'visible';
		} else if (hover[i]) {
			showButton = hover[i];
		} else {
			showButton = 'invisible';
		}
		return showButton;
	};

	$: if (showButton === 'invisible') {
		openMenu = false;
	} else {
		openMenu = true;
	}
</script>

<Popover class="relative" let:open let:close>
	<PopoverButton class={`${isShowButton(open)} text-gray-400 hover:text-black py-2 px-2`}>
		<IconMenu />
	</PopoverButton>

	<Transition
		enter="transition ease-out duration-200"
		enterFrom="opacity-0 translate-y-1"
		enterTo="opacity-100 translate-y-0"
		leave="transition ease-in duration-150"
		leaveFrom="opacity-100 translate-y-0"
		leaveTo="opacity-0 translate-y-1"
	>
		<PopoverPanel class="absolute z-10 -left-16 transform text-xs px-2">
			<div class=" rounded-lg shadow-lg ring-1 ring-black ring-opacity-5  bg-gray-500 hover:bg-gray-500 ">
				<div class="flex flex-col ">
					<button
						on:click={() => {
							projectIndex = projectId;
							isOpenModal = true;
						}}
						class="flex flex-row items-center gap-2 py-2 px-4 text-white hover:text-gray-700"
					>
						<IconEdit classes="w-4 h-4" />Edit</button
					>
					<button
						on:click={() => {
							isOpenWarning = true;
							projectIndex = projectId;
						}}
						class="flex flex-row items-center gap-2 py-2 px-4 text-white hover:text-gray-700"
					>
						<IconTrash classes="w-4 h-4" />Delete</button
					>
				</div>
			</div>
		</PopoverPanel>
	</Transition>
</Popover>
