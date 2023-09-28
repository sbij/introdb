<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { currentUser, pb } from '$lib/pocketbase';
	import '../app.scss';
	import { page } from '$app/stores';
	//import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary mb-3">
	<div class="container-fluid">
		<a class="navbar-brand" href="/">Agrume</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarSupportedContent"
			aria-controls="navbarSupportedContent"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon" />
		</button>
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				<li class="nav-item">
					<a class="nav-link" class:active={$page.url.pathname === '/'} aria-current="page" href="/"
						>Accueil</a
					>
				</li>
				<li class="nav-item">
					<a
						class="nav-link"
						class:active={$page.url.pathname === '/propositions'}
						href="/propositions">Explorer propositions</a
					>
				</li>
				<li class="nav-item">
					<a
						class="nav-link"
						class:active={$page.url.pathname === '/argumentbuilder'}
						href="/argumentbuilder">argumentbuilder</a
					>
				</li>
			</ul>
			<ul class="navbar-nav mb-2 mb-lg-0">
				{#if $currentUser}
					<li class="nav-item"><a href="/">{$currentUser.email}</a></li>
					<li class="nav-item">
						<form
							method="POST"
							action="/logout"
							use:enhance={() => {
								return async ({ result }) => {
									pb.authStore.clear();
									await applyAction(result);
								};
							}}
						>
							<button class="btn btn-primary btn-sm ms-2">Log out</button>
						</form>
					</li>
				{:else}
					<li class="nav-item"><a class="nav-link" href="/login">Log in</a></li>
					<li class="nav-item"><a class="nav-link" href="/register">Register</a></li>
				{/if}
			</ul>
		</div>
	</div>
</nav>

<div class="container">
	<slot />
</div>

<footer><br /><br /><br /><br /><br /><a href="/apropos">À propos</a></footer>
