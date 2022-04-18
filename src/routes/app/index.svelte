<script>
	import AddTask from '$lib/components/task/AddTask.svelte';

	import AllTasks from '$lib/components/task/AllTasks.svelte';
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
	<h1 class="text-2xl font-semibold text-gray-900">Inbox</h1>
</div>
<div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
	<AllTasks />
	<AddTask />
</div>

<style>
</style>
