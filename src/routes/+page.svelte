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

<div class="bg-white">
	<hr />
	{#each data.recordsobj as subject}
		<a href="subject/{subject.id}" class="text-decoration-none px-2">{subject.name}</a>
		<hr />
	{/each}
</div>

<style>
	hr {
		margin-top: 0.2rem;
		margin-bottom: 0.2rem;
	}
</style>
