<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { currentUser, pb } from '$lib/pocketbase';

	export let data: PageData;
	console.log(data);

</script>

<svelte:head>
	<title>{data.ressourceobj.name} | Introdb.mocob.org</title>
</svelte:head>

<div class="border border-slate-300 my-3 bg-white px-2 py-1 rounded">
	<b>{data.ressourceobj.name}</b>
	{#if data.ressourceobj.url != ''}
		<a href={data.ressourceobj.url}>{data.ressourceobj.url}</a>
	{/if}
	<br />
	Type :
	{#if data.ressourceobj.expand['data.ressourceobjtype'] !== undefined}
		[{data.ressourceobj.expand['data.ressourceobjtype'].name}]
	{/if}
	<br />

	Disciplines :
	{#if data.ressourceobj.expand['disciplines'] !== undefined}
		{#each data.ressourceobj.expand['disciplines'] as disc}
			<span>[{disc.name}] </span>
		{/each}
	{/if}
	<br />

	Themes :
	{#if data.ressourceobj.expand['themes'] !== undefined}
		{#each data.ressourceobj.expand['themes'] as theme}
			<span>[{theme.name}] </span>
		{/each}
	{/if}
	<br />
	Langues :
	{#if data.ressourceobj.languages != ''}
		{#each data.ressourceobj.languages.split(',') as language}
			<span>[{language.trim()}] </span>
		{/each}
	{/if}

	<div class="border rounded bg-slate-100 px-2 py-1 mt-2 mb-1">
		Commentaires :

		<ul class="list-disc list-inside">
			{#if data.ressourceobj.expand['votes(data.ressourceobj)'] !== undefined}
				{#each data.ressourceobj.expand['votes(data.ressourceobj)'] as vote}
					<li>
						<span>{vote.expand.value.value}</span> :
						{vote.comment}
						{#if vote.expand.user !== undefined}
							(<a href="/user/{vote.expand.user.id}"
								>{vote.expand.user.name
									? vote.expand.user.name
									: vote.expand.user.username}</a
							>)
						{/if}

						{#if $currentUser}
							{#if $currentUser.id == vote.user}
								<form method="POST" action="/vote/{vote.id}/delete">
									<button>Supprimer</button>
								</form>
							{/if}
						{/if}
					</li>
				{/each}
			{:else}
				<li><i>Aucun commentaire</i></li>
			{/if}
		</ul>
		<details>
			<summary>Ajouter un commentaire</summary>

		</details>
	</div>
</div>