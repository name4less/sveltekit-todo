<script>
	import ProjectPage from '$lib/components/project/ProjectPage.svelte';
	import { page } from '$app/stores';

	$: id = $page.url.pathname;
	$: urlList = id.split('/');
	$: projectTitle = urlList[3];
</script>

<ProjectPage {projectTitle} />
