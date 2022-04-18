<script>
	import { MenuItems, MenuItem } from '@rgossiaux/svelte-headlessui';
</script>

<MenuItems
	class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
	role="menu"
	aria-orientation="vertical"
	aria-labelledby="user-menu-button"
	tabindex="-1"
>
	<!-- Active: "bg-gray-100", Not Active: "" -->
	<MenuItem>
		<a href="/app/profile" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0"
			>Your Profile</a
		>
	</MenuItem>
	<MenuItem>
		<a
			href="/api/sign-out"
			rel="external"
			class="block px-4 py-2 text-sm text-gray-700"
			role="menuitem"
			tabindex="-1"
			id="user-menu-item-0">Sign out</a
		>
	</MenuItem>
</MenuItems>
