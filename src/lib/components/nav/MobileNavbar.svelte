<script>
	import ProjectsList from '../project/ProjectsList.svelte';
	import NavLink from '$lib/components/nav/NavLink.svelte';
	import { IconCalendar, IconReports, IconMail } from '$lib/components/icon';

	export let openMobileNav = 'hide';
	let overlay;
	$: openMobileNav === 'hide' ? (overlay = 'hidden') : (overlay = 'fixed index');
</script>

<div on:click={() => (openMobileNav = 'hide')} class={`${overlay} inset-0 bg-gray-600 bg-opacity-75 z-10" aria-hidden="true`} />
<div class={`${openMobileNav} fixed inset-0 flex z-40 md:hidden`} role="dialog" aria-modal="true">
	<div class="relative flex-1 flex flex-col max-w-xs w-full pb-4 bg-gray-800">
		<div class="absolute top-0 right-0 -mr-12 pt-2">
			<button
				on:click={() => (openMobileNav = 'hide')}
				type="button"
				class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
			>
				<span class="sr-only">Close sidebar</span>
				<!-- Heroicon name: outline/x -->
				<svg
					class="h-6 w-6 text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<div class="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
			<span class="text-white text-xl">TODO App</span>
		</div>
		<div class="mt-5 flex-1 h-0 overflow-y-auto">
			<nav class="px-2 space-y-1">
				<NavLink href="/app" bind:openMobileNav>
					<IconMail classes="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6" />
					Inbox
				</NavLink>
				<NavLink href="/app/today" bind:openMobileNav>
					<IconCalendar classes="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6" />
					Today
				</NavLink>

				<NavLink href="#">
					<ProjectsList bind:openMobileNav />
				</NavLink>

				<NavLink href="/app/reports" bind:openMobileNav>
					<IconReports classes="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6" />
					Reports
				</NavLink>
			</nav>
		</div>
	</div>

	<div class="flex-shrink-0 w-14" aria-hidden="true">
		<!-- Dummy element to force sidebar to shrink to fit close icon -->
	</div>
</div>
