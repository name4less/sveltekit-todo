<script>
	import { getDate } from '$lib/util/DateUtils';
	import { Popover, PopoverPanel, PopoverButton, Transition } from '@rgossiaux/svelte-headlessui';
	import { InlineCalendar } from 'svelte-calendar';

	const theme = {
		calendar: {
			legend: {
				height: '30px'
			},
			width: '360px',
			shadow: '0px 0px 5px rgba(0, 0, 0, 0.25)'
		}
	};

	export let task = null;
</script>

<Popover class="relative" let:open>
	<PopoverButton
		class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
			<path
				fill-rule="evenodd"
				d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
				clip-rule="evenodd"
			/>
		</svg>{getDate(task.dueDate)}</PopoverButton
	>

	<Transition
		enter="transition ease-out duration-200"
		enterFrom="opacity-0 translate-y-1"
		enterTo="opacity-100 translate-y-0"
		leave="transition ease-in duration-150"
		leaveFrom="opacity-100 translate-y-0"
		leaveTo="opacity-0 translate-y-1"
	>
		<PopoverPanel class="absolute z-10 left-0 transform mt-0 text-xs px-2 sm:px-0">
			<div class="panel rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
				<div class="flex flex-row">
					<InlineCalendar bind:selected={task.dueDate} start={new Date()} {theme} />
				</div>
			</div>
		</PopoverPanel>
	</Transition>
</Popover>
