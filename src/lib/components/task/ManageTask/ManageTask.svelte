<script>
	import { PopoverGroup } from '@rgossiaux/svelte-headlessui';
	import Calendar from './Calendar.svelte';
	import TimePickerComponent from './TimePickerComponent.svelte';
	import ProjectSelect from './ProjectSelect.svelte';

	export let task = null;
	export let insertingTime = false;
	export let selected = {
		title: 'Inbox',
		project_id: -1
	};
</script>

<div class="border border-gray-200">
	<form class="py-2" on:submit|preventDefault={() => {}}>
		<input
			type="text"
			class="block w-full px-4 py-2 text-gray-700 bg-white outline-none"
			placeholder="Task name"
			bind:value={task.title}
		/>
		<textarea
			class="block w-full px-4 py-2 text-gray-700 bg-white outline-none resize-none"
			placeholder="Description"
			bind:value={task.description}
		/>
		<PopoverGroup class="flex flex-row w-full px-4 gap-2">
			<Calendar bind:task />
			<TimePickerComponent bind:task bind:insertingTime />
			<ProjectSelect bind:task bind:selected />
		</PopoverGroup>
	</form>
</div>

<style>
</style>
