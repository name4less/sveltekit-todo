<script>
	import ProfileMenu from '$lib/components/menu/ProfileMenu.svelte';
	import { Menu, MenuButton } from '@rgossiaux/svelte-headlessui';
	import { userDetails } from '$lib/stores/auth';

	export let openMobileNav = 'hide';
</script>

<div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
	<button
		on:click={() => (openMobileNav = 'show')}
		type="button"
		class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
	>
		<span class="sr-only">Open sidebar</span>
		<!-- Heroicon name: outline/menu-alt-2 -->
		<svg
			class="h-6 w-6"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			aria-hidden="true"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
		</svg>
	</button>
	<div class="flex-1 px-4 flex justify-between">
		<div class="flex-1 flex">
			<form class="w-full flex md:ml-0" action="#" method="GET">
				<label for="search-field" class="sr-only">Search</label>
				<div class="relative w-full text-gray-400 focus-within:text-gray-600">
					<div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
						<!-- Heroicon name: solid/search -->
						<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path
								fill-rule="evenodd"
								d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
					<input
						id="search-field"
						class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
						placeholder="Search"
						type="search"
						name="search"
					/>
				</div>
			</form>
		</div>
		<div class="ml-4 flex items-center md:ml-6">
			<button
				type="button"
				class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>
				<span class="sr-only">View notifications</span>
				<!-- Heroicon name: outline/bell -->
				<svg
					class="h-6 w-6"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
					/>
				</svg>
			</button>

			<!-- Profile dropdown -->
			<Menu class="ml-3 relative">
				<div>
					<MenuButton
						type="button"
						class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
						id="user-menu-button"
						aria-expanded="false"
						aria-haspopup="true"
					>
						<span class="sr-only">Open user menu</span>

						{#if $userDetails}
							<img class="h-8 w-8 rounded-full" src={$userDetails.avatar} alt="user profile" />
						{:else}
							<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 rounded-full " viewBox="0 0 20 20" fill="currentColor">
								<path
									class="text-white"
									fill-rule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
									clip-rule="evenodd"
								/>
							</svg>
						{/if}
					</MenuButton>
				</div>

				<ProfileMenu />
			</Menu>
		</div>
	</div>
</div>
