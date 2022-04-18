<script>
	import { userDetails } from '$lib/stores/auth';
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
	<div class="py-4">
		<div class="bg-white shadow overflow-hidden sm:rounded-lg">
			<div class="px-4 py-5 sm:px-6">
				<h3 class="text-lg leading-6 font-medium text-gray-900">Account Information</h3>
				<p class="mt-1 max-w-2xl text-sm text-gray-500">Review and edit your account details.</p>
			</div>
			<div class="border-t border-gray-200 px-4 py-5 sm:p-0">
				<dl class="sm:divide-y sm:divide-gray-200">
					<div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt class="text-sm font-medium text-gray-500">Full name</dt>
						<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">todo</dd>
					</div>
					<div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt class="text-sm font-medium text-gray-500">Email address</dt>
						<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{$userDetails.email}</dd>
					</div>
				</dl>
			</div>
		</div>
	</div>
</div>

<style>
</style>
