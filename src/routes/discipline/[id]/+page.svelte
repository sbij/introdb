<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	console.log(data);
</script>

<svelte:head>
	<title>Discipline : {data.disciplineobj[0].name} | introdb.mocob.org</title>
</svelte:head>

<h2 class="text-xl mt-2 mb-2">Discipline : <b>{data.disciplineobj[0].name}</b></h2>

<!-- <h3>Liste des ressources</h3> -->

<h3 class="text-base font-bold mt-3 mb-2">Ressources</h3>

{#each data.ressourcesobj as ressource, idx}
	<div class="border px-2 py-1 mb-1">
		{ressource.ressources.content} <br />
		{#if ressource.ressources.url}
			<a href={ressource.ressources.url}>{ressource.ressources.url}</a>
			<br />
		{/if}
		<!-- {#if ressource.content}
			<p class="font-medium">
				{ressource.content}
			</p>
		{/if}
		{#if ressource.url}
			<p>
				<a href={ressource.url}>{ressource.url}</a> <br />
			</p>
		{/if}
		{#if ressource.description}
			<p>
				{ressource.description}
			</p>
		{/if} -->
	</div>
{/each}

<h3 class="text-base font-bold mt-3 mb-2">Autres ressources</h3>

<h3 class="text-base font-bold mt-3 mb-2">Ressources des disciplines parents</h3>
<h3 class="text-base font-bold mt-3 mb-2">Ressources des disciplines enfants</h3>

<div class="grid md:grid-cols-3 gap-4 mb-4 border py-1 px-2 text-sm mt-10">
	<div>
		<ul class="list-inside list-disc">
			<li>
				Disciplines parent :
				<ul class="list-inside list-disc ml-4">
					{#each data.disciplinesparentobj as parentdiscipline, idx}
						<li>
							<a href="/discipline/{parentdiscipline.disciplines.id}" class=""
								>{parentdiscipline.disciplines.name}</a
							>
						</li>
					{:else}
						<li>Aucune discipline parent</li>
					{/each}
				</ul>
			</li>
			<li>
				Discipline actuelle :

				<ul class="list-inside list-disc ml-4">
					<li>
						<a
							href="/discipline/{data.disciplineobj[0].id}"
							class="text-gray-800 visited:text-gray-800">{data.disciplineobj[0].name}</a
						>
					</li>
				</ul>
			</li>

			<li>
				Disciplines enfant :
				<ul class="list-inside list-disc ml-4">
					{#each data.disciplinesenfantobj as enfantdiscipline, idx}
						<li>
							<a href="/discipline/{enfantdiscipline.disciplines.id}" class=""
								>{enfantdiscipline.disciplines.name}</a
							>
						</li>
					{:else}
						<li>Aucune discipline enfant</li>
					{/each}
				</ul>
			</li>
		</ul>
	</div>
	<div>
		<p>Disciplines à côté :</p>
		<!-- sibling disciplines -->
	</div>
	<div>
		<p>Disciplines liées :</p>
		<!-- défini grace aux themes. les disciplines où y a des themes en commun -->
	</div>
</div>
