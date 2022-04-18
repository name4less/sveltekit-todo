<script>
	import TimePicker from 'svelte-time-picker';
	import { Popover, PopoverPanel, PopoverButton, Transition } from '@rgossiaux/svelte-headlessui';

	export let task = null;
	export let insertingTime = false;

	const timePickerOptions = {
		clockClassName: 'style-clock'
	};
</script>

<Popover class="relative" let:close>
	<PopoverButton
		class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
			<path
				fill-rule="evenodd"
				d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
				clip-rule="evenodd"
			/>
		</svg>
		{insertingTime === false
			? 'All day'
			: task.time.toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit'
			  })}</PopoverButton
	>

	<Transition
		enter="transition ease-out duration-200"
		enterFrom="opacity-0 translate-y-1"
		enterTo="opacity-100 translate-y-0"
		leave="transition ease-in duration-150"
		leaveFrom="opacity-100 translate-y-0"
		leaveTo="opacity-0 translate-y-1"
	>
		<PopoverPanel class="absolute z-10 left-0 transform mt-0 px-2 w-screen max-w-xs sm:px-0">
			<div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden bg-white p-2">
				<div class="relative">
					<div class="flex w-full gap-2">
						<button
							type="button"
							on:click={() => {
								insertingTime = true;
								close(null);
							}}
							class="inline-flex items-center mb-2 px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Set Time
						</button>
						<button
							type="button"
							on:click={() => {
								insertingTime = false;
								close(null);
							}}
							class="inline-flex items-center mb-2 px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Remove Time
						</button>
					</div>
					<TimePicker date={task.time} options={timePickerOptions} />
				</div>
			</div>
		</PopoverPanel>
	</Transition>
</Popover>
