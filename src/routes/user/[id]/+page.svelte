<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { currentUser, pb } from '$lib/pocketbase';

	export let data: PageData;
	console.log(data);
</script>

<svelte:head>
	<title>{data.indivrecordobj.username} | Introdb.mocob.org</title>
</svelte:head>

<h2>{data.indivrecordobj.username}</h2>
<!-- <h3>Liste des ressources</h3> -->

{#if data.indivrecordobj.name != ""}
username modifié: {data.indivrecordobj.name}
{/if}

{#if $currentUser}
	{#if $currentUser.id == data.indivrecordobj.id}
		
	field username (laisser vide pour username généré automatiquement),

	field description/présentation rapide
	{/if}
{/if}

<h3>Recommandations de l'utilisateur :</h3>
<ul>
	{#each data.ressourceslist as vote, i}
		<li><a href="/subject/{vote.expand.ressource.expand.subject.id}">{vote.expand.ressource.expand.subject.name}</a> : {vote.expand.ressource.name} 
			<ul><li>{vote.expand.value.value} : {vote.comment}</li></ul></li>
	{:else}
		Aucune ressource
	{/each}
</ul>
