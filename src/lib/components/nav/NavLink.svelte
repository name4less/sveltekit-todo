<script>
	import { page } from '$app/stores';

	export let href;
	export let openMobileNav = 'hide';

	const activeStyles = 'bg-gray-700 text-white';
</script>

<a
	{href}
	on:click={() => {
		openMobileNav = 'hide';
	}}
	class={`${
		$page.url.pathname === href && activeStyles
	} text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-lg font-medium rounded-md md:text-sm`}
>
	<slot />
</a>

<style>
</style>
