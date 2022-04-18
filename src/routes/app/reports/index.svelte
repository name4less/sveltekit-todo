<script>
	import Chart from '$lib/components/chart/Chart.svelte';
	import { list as taskLisk } from '$lib/stores/todos';
	import { list as projectList } from '$lib/stores/projects';
	import { list as colorList } from '$lib/stores/colors';
	import { getCurrentWeek } from '$lib/util/DateUtils';
	import TaskCompleted from '$lib/components/task/TaskCompleted.svelte';

	let isShowTask = false;

	let chartData = [];
	let dataColor = {};

	const projectsToData = (project) => {
		return {
			group: project.title,
			count: 0
		};
	};

	$: if ($projectList) {
		chartData = [];
		$projectList.forEach((project) => chartData.push(projectsToData(project)));

		$projectList.forEach((project) => {
			let count = 0;

			$taskLisk.forEach((task) => {
				let isCurrentWeek = getCurrentWeek(task.dueDate);
				if (project.id === task.project_id && isCurrentWeek) {
					count++;
				}
			});

			chartData.forEach((data) => (data.group === project.title ? (data.count = count) : ''));
		});

		$projectList.forEach((project) => {
			let colorObj;
			$colorList.forEach((color) => {
				color.id === project.color ? (colorObj = color) : '';
			});

			Object.defineProperty(dataColor, `${project.title}`, {
				value: colorObj.hex,
				writable: true,
				enumerable: true,
				configurable: true
			});
		});
	}

	$: sortedTasks = $taskLisk.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
	$: tasks = sortedTasks.filter((a) => getCurrentWeek(a.dueDate) && a.completed === true);

	//$: console.log(tasks);
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
	<Chart data={chartData} {dataColor} />

	<div class="py-4">
		<button class="underline" on:click={() => (isShowTask = !isShowTask)}>{isShowTask ? 'Hide' : 'Show'} completed tasks</button>
	</div>

	{#if isShowTask}
		<div class="">
			<p class="pt-8 font-bold">Completed Tasks</p>
			<ul class="-my-5 divide-y divide-gray-200 py-6">
				{#if tasks?.length > 0}
					{#each tasks as task, i}
						<TaskCompleted {task} />
					{/each}
				{/if}
			</ul>
		</div>
	{/if}
</div>
