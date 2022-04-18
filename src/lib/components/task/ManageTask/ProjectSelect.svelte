<script>
	import { list } from '$lib/stores/projects';
	import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Transition } from '@rgossiaux/svelte-headlessui';

	$: projectList = $list;

	export let selected = {
		title: 'Inbox',
		project_id: -1
	};

	export let task = null;

	const selectDefault = { title: 'Inbox', id: -1 };
	$: task.project_id = selected.project_id;
</script>

<div class="relative">
	<div
		class="w-20 absolute inline-flex items-center border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white sm:w-36 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
	>
		<Listbox
			class="w-full"
			bind:value={selected}
			on:change={(e) => {
				selected.title = e.detail.title;
				selected.project_id = e.detail.id;
			}}
		>
			<div class="relative w-full">
				<ListboxButton
					class="relative w-full text-left cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
				>
					<span class="block truncate w-full px-2.5 py-1.5">{selected.title}</span>
				</ListboxButton>
				<Transition leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
					<ListboxOptions
						class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
					>
						<ListboxOption
							key={0}
							value={selectDefault}
							let:selected
							let:active
							class={({ active }) =>
								`${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                  w-full cursor-default select-none relative py-2 pr-4`}
						>
							<span class={`${selected ? 'font-medium' : 'font-normal'} px-2 block truncate`}> {selectDefault.title} </span>
							{#if selected}
								<span
									class={`${active ? 'text-amber-600' : 'text-amber-600'}
                        absolute inset-y-0 left-0 flex items-center pl-3`}
								/>
							{/if}
						</ListboxOption>
						{#each projectList as project, index}
							<ListboxOption
								key={index + 1}
								class={({ active }) =>
									`${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                          w-full cursor-default select-none relative py-2 pr-4`}
								value={project}
								let:selected
								let:active
							>
								<span class={`${selected ? 'font-medium' : 'font-normal'} px-2 block truncate`}>
									{project.title}
								</span>
								{#if selected}
									<span
										class={`${active ? 'text-amber-600' : 'text-amber-600'}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
									/>
								{/if}
							</ListboxOption>
						{/each}
					</ListboxOptions>
				</Transition>
			</div>
		</Listbox>
	</div>
</div>
