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
	<h2>Sujets :</h2>
	<ul>
		{#each data.recordsobj as subject}
			{#if subject.expand['ressources(subject)']}
				<li>
					<a href="subject/{subject.id}">{subject.name}</a>
					({subject.expand['ressources(subject)'].length} ressource{subject.expand[
						'ressources(subject)'
					].length == 1
						? ''
						: 's'})
					{#if $currentUser}
						{#if $currentUser.id == subject.user}
							<form method="POST" action="/subject/{subject.id}/delete" style="display:inline;">
								<button>Supprimer</button>
							</form>
						{/if}
					{/if}
				</li>
			{/if}
		{/each}
	</ul>
</section>

<section>
	<h2 class="mt">Sujets avec un besoin de contributions :</h2>

	<ul>
		{#each data.recordsobj as subject}
			{#if !subject.expand['ressources(subject)']}
				<li>
					<a href="subject/{subject.id}">{subject.name}</a> (0 ressources)
					{#if $currentUser}
						{#if $currentUser.id == subject.user}
							<form method="POST" action="/subject/{subject.id}/delete" style="display:inline;">
								<button>Supprimer</button>
							</form>
						{/if}
					{/if}
				</li>
			{/if}
		{/each}
	</ul>
</section>

<section>
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
	h2 {
		font-size: 1.2em;
		margin-top: 20px;
	}
	.mt {
		margin-top: 30px;
	}
</style>
