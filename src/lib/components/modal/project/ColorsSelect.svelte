<script>
	import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Transition } from '@rgossiaux/svelte-headlessui';
	import { list } from '$lib/stores/colors';

	$: colorList = $list;

	export let selected = { id: 12, name: 'Gray', hex: '#bfbfbf' };
</script>

<div class="relative w-full">
	<label for="projectColor" class=" block text-sm font-bold text-gray-700 mb-1 ml-1">Color</label>
	<div
		class="w-full absolute inline-flex items-center border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
	>
		<Listbox
			class="w-full"
			bind:value={selected}
			on:change={(e) => {
				selected.name = e.detail.name;
				selected.id = e.detail.id;
				selected.hex = e.detail.hex;
			}}
		>
			<div class="relative w-full">
				<ListboxButton
					class="relative w-full flex flex-row  pl-2 items-center text-left cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
				>
					<span style={`background-color: ${selected.hex}`} class="block truncate w-2 h-2 rounded-full" />
					<span class="block truncate w-full px-2.5 py-1.5">{selected.name}</span>
				</ListboxButton>
				<Transition leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
					<ListboxOptions
						class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
					>
						{#each colorList as color, index}
							<ListboxOption
								key={index}
								class={({ active }) =>
									`${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                          w-full cursor-default select-none relative py-2 pr-4`}
								value={color}
								let:selected
								let:active
							>
								<span class={`${selected ? 'font-medium' : 'font-normal'} px-2 flex flex-row items-center gap-3 truncate`}>
									<span style={`background-color: ${color.hex}`} class="block w-3 h-3 rounded-full" />
									<span>{color.name}</span>
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
