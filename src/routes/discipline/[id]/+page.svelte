<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { currentUser, pb } from '$lib/pocketbase';
	import { discipandress } from '$lib/showdisciplineandressources';

	export let data: PageData;
	console.log(data);
</script>

<svelte:head>
	<title>Discipline : {data.disciplineobj.name} | introdb.mocob.org</title>
</svelte:head>

<div class="grid md:grid-cols-3 gap-4 mb-4">

<div>
	Disciplines parent :
	{#if data.disciplineobj.expand['parentdisciplines'] !== undefined}
		<ul class="list-inside list-disc">
			{#each data.disciplineobj.expand['parentdisciplines'] as parentdiscipline, idx}
				<li>
					<a href="/discipline/{parentdiscipline.id}" class="text-blue-800"
						>{parentdiscipline.name}</a
					>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<div>
	Disciplines enfant :
	<ul class="list-inside list-disc">
		{#each data.childrendisciplinesobj as childrendiscipline, idx}
			<li>
				<a href="/discipline/{childrendiscipline.id}" class="text-blue-800"
					>{childrendiscipline.name}</a
				>
			</li>
		{/each}
	</ul>
</div>
<div>Disciplines liées :</div>
</div>



<h2 class="text-xl mt-2 mb-2">Discipline : <b>{data.disciplineobj.name}</b></h2>
<!-- <h3>Liste des ressources</h3> -->

<h3 class="text-base font-bold mt-2 mb-2">Disciplines parent et ressources</h3>
<h3 class="text-base font-bold mt-2 mb-2">Ressources de la discipline {data.disciplineobj.name}</h3>

{#each data.ressourcesobj as ressource, idx}
<div class="border px-2 py-1">
	{ressource.content} <br>
	<a href="{ressource.url}">{ressource.url}</a> <br>
	{ressource.description} <br>

</div>
{/each}
<h3 class="text-base font-bold mt-2 mb-2">Disciplines enfant et ressources</h3>
