<script>
	import NavLink from '$lib/components/nav/NavLink.svelte';
	import { IconCalendar, IconReports, IconMail } from '$lib/components/icon';
	import ProjectsList from '$lib/components/project/ProjectsList.svelte';
</script>

<div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
	<!-- Sidebar component, swap this element with another sidebar if you like -->
	<div class="flex-1 flex flex-col min-h-0 bg-gray-800">
		<div class="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
			<span class="text-white text-xl">TODO App</span>
		</div>
		<div class="flex-1 flex flex-col overflow-y-auto">
			<nav class="flex-1 px-2 py-4 space-y-1">
				<NavLink href="/app">
					<IconMail classes="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6" />
					Inbox
				</NavLink>
				<NavLink href="/app/today">
					<IconCalendar classes="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6" />
					Today
				</NavLink>
				<NavLink href="/app/reports">
					<IconReports classes="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6" />
					Reports
				</NavLink>

				<NavLink href="#">
					<ProjectsList />
				</NavLink>
			</nav>
		</div>
	</div>
</div>
