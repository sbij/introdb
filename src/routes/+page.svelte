<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	console.log(data);
</script>

<svelte:head>
	<title>Introdb.mocob.org</title>
</svelte:head>

<p>L'introdb contient des listes de ressources d'introduction à différents sujets.</p>

<!-- <h2 class="h5 mt-4 mb-3">Liste des sujets</h2> -->

<section>
	<div class="list-group shadow-sm">
		{#each data.recordsobj as subject}
			<a href="subject/{subject.id}" class="list-group-item list-group-item-action">{subject.name}</a>
		{/each}
	</div>


	<div class=" mt-5">
		Ajouter un sujet :

		<form method="POST" action="?/addSubject" use:enhance>
			<div class="mb-3">
				<label for="name" class="form-label">Nom</label>
				<input type="text" class="form-control" id="name" name="name" />
			</div>

			<button type="submit" class="btn btn-primary">Ajouter</button>
		</form>
	</div>
</section>

<style>
</style>