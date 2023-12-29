<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { currentUser, pb } from '$lib/pocketbase';

	export let data: PageData;
	console.log(data);

	let sortedRessources = data.ressourceslist;
	sortedRessources.sort((a, b) => (a.expand['value'].weight > b.expand['value'].weight ? -1 : 1));
</script>

<svelte:head>
	<title>{data.indivrecordobj.name ? data.indivrecordobj.name : data.indivrecordobj.username} | Introdb.mocob.org</title>
</svelte:head>

<h2>{data.indivrecordobj.name ? data.indivrecordobj.name : data.indivrecordobj.username}</h2>
Description : {data.indivrecordobj.description}
<!-- <h3>Liste des ressources</h3> -->

{#if $currentUser}
	{#if $currentUser.id == data.indivrecordobj.id}
		<br />
		<br />

		<h4>Modifier mes informations :</h4>
		<form method="POST" action="?/updateUser" use:enhance>
			<div>
				<label for="name"
					>Pseudo/nom (laisser vide pour username généré automatiquement : {data.indivrecordobj
						.username})</label
				>
				<br />
				<input name="name" type="text" value={data.indivrecordobj.name} disabled={!$currentUser} />
			</div>
			<div>
				<label for="description">description/présentation rapide</label>
				<br />
				<input
					name="description"
					type="text"
					value={data.indivrecordobj.description}
					disabled={!$currentUser}
				/>
			</div>
			<button type="submit" disabled={!$currentUser}>Modifier</button>
		</form>
	{/if}
{/if}

<h3>Recommandations de l'utilisateur :</h3>
<ul>
	{#each data.ressourceslist as vote, i}
		<li>
			{vote.expand.value.value}
			<a href="/discipline/{vote.expand.ressource.expand.discipline.id}"
				>[{vote.expand.ressource.expand.discipline.name}]</a
			>
			: <b>{vote.expand.ressource.name}</b>
			<ul><li>{vote.comment}</li></ul>
		</li>
	{:else}
		Aucune ressource
	{/each}
</ul>
