<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { currentUser, pb } from '$lib/pocketbase';
	import '../app.scss';
	import { page } from '$app/stores';
	//import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
</script>

<div>
	<div class="fullpage">
		<header>
			<a href="/"
				><div>
					<div>
						<h1>
							introdb<small>.mocob.org</small>
						</h1>
						<!-- <small>Since 2011</small> -->
					</div>
				</div></a
			>
		</header>
		<nav class="navbar">
			<ul>
				{#if $currentUser}
					<li>{$currentUser.email}</li>
					<li><form
					method="POST"
					action="/logout"
					use:enhance={() => {
						return async ({ result }) => {
							pb.authStore.clear();
							await applyAction(result);
						};
					}}
				>
					<button>Log out</button>
				</form></li>
				{:else}
				<li><a href="/register">Register</a></li>
				<li><a href="/login">Login</a></li>
				{/if}
			</ul>
		</nav>
		<div>
			<slot />
		</div>
		<footer>Footer</footer>
	</div>
</div>

<style>
	.fullpage {
		max-width: 720px;
		margin:auto;
		padding-left: 10px;
		padding-right: 10px;
	}
	.navbar {
		margin-bottom: 50px;
	}
	footer {
		margin-top: 50px;
		margin-bottom: 50px;
	}
</style>
