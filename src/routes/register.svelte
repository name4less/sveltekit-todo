<script>
	import RegisterForm from '$lib/components/form/RegisterForm.svelte';
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import { attemptingLogin } from '$lib/stores/auth';

	let error;

	async function handleSubmit({ detail: { email, password } }) {
		if (email && password) {
			$attemptingLogin = true;
			const response = await fetch('/api/sign-up', {
				method: 'POST',
				body: JSON.stringify({ email, password }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const body = await response.json();
			await new Promise((resolve) => setTimeout(resolve, 2000));
			if (response.ok && !body.error) {
				$session = body;
				$attemptingLogin = false;
				await goto('/app');
			}
			error = body.error;
			$attemptingLogin = false;
		}
	}
</script>

<div class="min-h-full flex flex-col justify-top py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
		<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up your account</h2>
	</div>
	<RegisterForm submitError={error} on:signup={handleSubmit} />
</div>

<style>
</style>
