<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { currentUser, pb } from '$lib/pocketbase';
	import '../app.css';
	import { page } from '$app/stores';
</script>

<div class="container mx-auto max-w-3xl px-3 py-4">
	<div>
		<header>
			<a href="/" class="no-underline text-black visited:text-black"
				><div>
					<div>
						<h1 class="text-2xl font-bold">
							introdb<small>.mocob.org</small>
						</h1>
						<!-- <small>Since 2011</small> -->
					</div>
				</div></a
			>
		</header>
		<nav>
			<ul class="list-disc list-inside mb-5 mt-3">
				{#if $currentUser}
					<li>
						<a href="/user/{$currentUser.id}"
							>{$currentUser.name ? $currentUser.name : $currentUser.username}</a
						>
						({$currentUser.email})
					</li>
					<li>
						<form
							method="POST"
							action="/logout"
							use:enhance={() => {
								return async ({ result }) => {
									if (confirm('Voulez-vous vous déconnecter ?')) {
										pb.authStore.clear();
										await applyAction(result);
									}
								};
							}}
						>
							<button>Log out</button>
						</form>
					</li>
				{:else}
					<li><a href="/register">Register</a></li>
					<li><a href="/login">Login</a></li>
				{/if}
			</ul>
		</nav>
		<div>
			<slot />
		</div>
		<footer>
			<small
				><i>Site développé au sein du projet <a href="https://mocob.org/">MoCOB.org</a></i></small
			>
		</footer>
	</div>
</div>
