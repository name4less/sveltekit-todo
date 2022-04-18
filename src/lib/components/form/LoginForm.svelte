<script>
	import FormButton from './FormButton.svelte';
	import SocialButton from './SocialButton.svelte';
	// import event dispatcher
	import { createEventDispatcher } from 'svelte';
	import { isEmail } from 'validator';
	import { normalizeEmail } from 'validator';
	import DOMPurify from 'dompurify';

	export let submitError;

	let error = {};
	let email = '';
	let password = '';

	const dispatch = createEventDispatcher();

	const validForm = () => {
		let valid = true;
		if (!isEmail(email)) {
			error.email = 'Please enter a valid email address';
			valid = false;
		}
		if (password.trim().length === 0) {
			error.password = 'Please enter a password';
			valid = false;
		}
		return valid;
	};

	const submitForm = () => {
		if (validForm()) {
			error.email = null;
			error.password = null;

			const sanitizedEmail = normalizeEmail(DOMPurify.sanitize(email), {
				gmail_remove_dots: false
			});
			const sanitizedPassword = DOMPurify.sanitize(password);

			dispatch('login', {
				email: sanitizedEmail,
				password: sanitizedPassword
			});
		}
	};

	const validateEmail = () => {
		error.email = null;
		if (!isEmail(email)) {
			error.email = 'Please enter a valid email address';
		}
	};

	const validatePassword = () => {
		error.password = null;
		if (password.trim().length === 0) {
			error.password = 'Please enter a password';
		}
	};
</script>

<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
	<form on:submit|preventDefault={submitForm} class="bg-white py-8 px-4 shadow flex flex-col gap-4 sm:rounded-lg sm:px-10">
		<div>
			<label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
			<div class="mt-1">
				<div class="flex relative">
					<input
						id="email"
						name="email"
						type="email"
						autocomplete="email"
						bind:value={email}
						on:keyup={validateEmail}
						required
						class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
					{#if !error?.email && email.length > 0}
						<lottie-player
							class="absolute right-0 top-0"
							src="https://assets1.lottiefiles.com/packages/lf20_uyqdkty5.json"
							background="transparent"
							speed="1"
							style="width: 40px; height: 40px;"
							autoplay
						/>
					{:else if error?.email}
						<lottie-player
							class="absolute right-0 top-0"
							src="https://assets5.lottiefiles.com/private_files/lf30_glnkkfua.json"
							background="transparent"
							speed="1"
							style="width: 40px; height: 40px;"
							autoplay
						/>
					{/if}
				</div>
				{#if error?.email}
					<span class="text-red-500">{error.email}</span>
				{/if}
			</div>
		</div>

		<div>
			<label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
			<div class="mt-1">
				<div class="flex relative">
					<input
						id="password"
						name="password"
						type="password"
						bind:value={password}
						on:keyup={validatePassword}
						autocomplete="current-password"
						required
						class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
					{#if !error?.password && password.length > 0}
						<lottie-player
							class="absolute right-0 top-0"
							src="https://assets1.lottiefiles.com/packages/lf20_uyqdkty5.json"
							background="transparent"
							speed="1"
							style="width: 40px; height: 40px;"
							autoplay
						/>
					{:else if error?.password}
						<lottie-player
							class="absolute right-0 top-0"
							src="https://assets5.lottiefiles.com/private_files/lf30_glnkkfua.json"
							background="transparent"
							speed="1"
							style="width: 40px; height: 40px;"
							autoplay
						/>
					{/if}
				</div>
				{#if error?.password}
					<span class="text-red-500">{error.password}</span>
				{/if}
			</div>
		</div>

		<FormButton text="Log in" on:submit={submitForm} />
		{#if submitError}
			<span class="text-red-600">{submitError}</span>
		{/if}
		<div class="text-grey-dark mt-6">
			Don't have an account?
			<a class="no-underline border-b border-blue text-blue" href="/register"> Register </a>.
		</div>

		<div class="mt-6 max-w-lg ml-auto mr-auto">
			<div class="relative">
				<div class="absolute inset-0 flex items-center">
					<div class="w-full border-t border-gray-300" />
				</div>
				<div class="relative flex justify-center text-sm">
					<span class="px-2 bg-white text-gray-500"> Or continue with </span>
				</div>
			</div>

			<div class="mt-6 grid grid-cols-3 gap-3">
				<SocialButton url="/oauth/github" text="Sign in with GitHub" />
			</div>
		</div>
	</form>
</div>

<style>
</style>
