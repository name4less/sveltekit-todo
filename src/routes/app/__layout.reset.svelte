<script context="module">
	let projectList = [];
	let tasksList = [];
	let colorList = [];

	export async function load({ session }) {
		if (!session?.user) {
			return {
				status: 302,
				redirect: '/login'
			};
		} else {
			const responseTask = await fetch('http://localhost:3000/api/task', {
				method: 'GET'
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					return data;
				});

			const responseProject = await fetch('http://localhost:3000/api/project', {
				method: 'GET'
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					return data;
				});

			const responseColor = await fetch('http://localhost:3000/api/color', {
				method: 'GET'
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					return data;
				});

			colorList = responseColor;
			tasksList = responseTask;
			projectList = responseProject;

			return {
				status: responseTask.status && responseProject.status && responseColor.status,
				props: { tasksList, projectList, colorList }
			};
		}
	}
</script>

<script>
	import { userDetails } from '$lib/stores/auth';
	import { setProjects } from '$lib/stores/projects';
	import { setTodos } from '$lib/stores/todos';
	import { setColors } from '$lib/stores/colors';
	import MobileNavbar from '$lib/components/nav/MobileNavbar.svelte';
	import DesktopNavbar from '$lib/components/nav/DesktopNavbar.svelte';
	import TopNavbar from '$lib/components/nav/TopNavbar.svelte';

	export let user;
	$: openMobileNav = 'hide';
	$userDetails = user;

	const tasksListArr = Array.from(tasksList);
	$: setTodos(tasksListArr);

	const projectsListArr = Array.from(projectList);
	$: setProjects(projectsListArr);

	const colorsListArr = Array.from(colorList);
	$: setColors(colorsListArr);
</script>

<div>
	<!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
	<MobileNavbar bind:openMobileNav />

	<!-- Static sidebar for desktop -->
	<DesktopNavbar />

	<div class="md:pl-64 flex flex-col z-10">
		<TopNavbar bind:openMobileNav />

		<main class="flex-1">
			<div class="py-6">
				<slot user />
			</div>
		</main>
	</div>
</div>
