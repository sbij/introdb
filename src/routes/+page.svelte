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

<p>L'introdb contient des listes de ressources d'introduction à différents sujets.</p>

<!-- <h2>Liste des sujets</h2> -->

<section>
	<ul>
		{#each data.recordsobj as subject}
			<li>
				<a href="subject/{subject.id}">{subject.name}</a>
				{#if $currentUser}
					{#if $currentUser.id == subject.user}
						Supprimer/modifier
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
