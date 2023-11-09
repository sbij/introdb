<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { currentUser, pb } from '$lib/pocketbase';

	export let data: PageData;
	console.log(data);
</script>

<svelte:head>
	<title>Introdb.mocob.org</title>
</svelte:head>

<p>Listes collaboratives de ressources d'introduction à différents sujets.</p>

<!-- <h2>Liste des sujets</h2> -->

<section>
	<ul>
		{#each data.recordsobj as subject}
			<li>
				<a href="subject/{subject.id}">{subject.name}</a>
				{#if subject.expand['ressources(subject)']}
					({subject.expand['ressources(subject)'].length} ressource{subject.expand[
						'ressources(subject)'
					].length == 1
						? ''
						: 's'})
				{:else}
					(0 ressources)
				{/if}
				{#if $currentUser}
					{#if $currentUser.id == subject.user}
						<form
							method="POST"
							action="/subject/{subject.id}/delete"
							style="display:inline;"
						>
							<button>Supprimer</button>
						</form>
					{/if}
				{/if}
			</li>
		{/each}
	</ul>

	<div>
		Ajouter un sujet :

		<form method="POST" action="?/addSubject" use:enhance>
			<div>
				<label for="name">Nom</label>
				<input type="text" id="name" name="name" disabled={!$currentUser} />
			</div>

			<button type="submit" disabled={!$currentUser}>Ajouter</button>
		</form>
	</div>
</section>

<style>
</style>
