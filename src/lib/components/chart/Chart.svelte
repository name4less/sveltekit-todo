<script>
	import '@carbon/charts/styles.min.css';
	import 'carbon-components/css/carbon-components.min.css';
	import { DonutChart } from '@carbon/charts-svelte';

	export let data = null;
	export let dataColor = null;
</script>

<DonutChart
	{data}
	options={{
		title: 'Tasks Chart',
		resizable: true,
		pie: {
			valueMapsTo: 'count'
		},
		legend: {
			alignment: 'center'
		},
		donut: {
			center: {
				label: 'Browsers'
			},
			alignment: 'center'
		},
		color: {
			scale: dataColor
		},
		height: '400px'
	}}
/>
