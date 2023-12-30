<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { currentUser, pb } from '$lib/pocketbase';

	export let data: PageData;
	console.log(data);
	let checkedDisciplines: string[] = [];
	let checkedThemes: string[] = [];

	let allRessources = data.ressourcesobj;
	let allDisciplines = data.disciplinesobj;
	let allThemes = data.themesobj;

	let filteredRessources = allRessources;
	let filteredDisciplines = allDisciplines;
	let filteredThemes = allThemes;

	console.log(allDisciplines);

	updateFilter();

	//console.log(filteredRessources);
	//console.log(Object.keys(data.ressourcesobj[0]));

	// first we filter the disciplines with the checked disciplines
	function updateFilter() {
		// if checkboxes are checked, we filter, else we return all the ressources
		if (checkedDisciplines.length > 0 || checkedThemes.length > 0) {
			const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];
			const result = words.filter((word) => word.length > 6);

			filteredRessources = allRessources.filter(
				(ress) =>
					checkedDisciplines.every((r) => ress.disciplines.includes(r)) &&
					checkedThemes.every((r) => ress.themes.includes(r))
			);
		} else {
			//filteredRessources = [];
			filteredRessources = allRessources;
		}

		filteredDisciplines = allDisciplines.filter((disc) =>
			filteredRessources.some((r) => r.disciplines.includes(disc.id))
		);
		filteredThemes = allThemes.filter((disc) =>
			filteredRessources.some((r) => r.themes.includes(disc.id))
		);
	}
	function resetDisciplines() {
		checkedDisciplines = [];
		updateFilter();
	}
	function resetThemes() {
		checkedThemes = [];
		updateFilter();
	}
</script>

<svelte:head>
	<title>Introdb.mocob.org</title>
</svelte:head>
<p>Listes collaboratives de ressources d'introduction à différentes disciplines et thèmes.</p>

<!-- <h2>Liste des disciplines</h2> -->
Ajouter des filtres :

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
	<section>
		<fieldset>
			<legend><h2 class="text-lg font-bold mt-4 mb-2">Disciplines :</h2></legend>

			{#each filteredDisciplines as discipline}
				<div>
					<input
						type="checkbox"
						bind:group={checkedDisciplines}
						value={discipline.id}
						id={discipline.id}
						name={discipline.id}
						on:change={updateFilter}
					/>
					<label for={discipline.id}>{discipline.name}</label>
				</div>
				<!-- <a href="discipline/{discipline.id}">{discipline.name}</a> -->
				<!-- ({discipline.expand['ressources(disciplines)'].length} ressource{discipline.expand[
						'ressources(disciplines)'
					].length == 1
						? ''
						: 's'}) -->
				{#if $currentUser}
					{#if $currentUser.id == discipline.user}
						<form method="POST" action="/discipline/{discipline.id}/delete">
							<button>Supprimer</button>
						</form>
					{/if}
				{/if}
			{/each}
		</fieldset>
		<a on:click={resetDisciplines} class="">Tout déselectionner</a>
	</section>

	<section>
		<fieldset>
			<legend><h2 class="text-lg font-bold mt-4 mb-2">Themes :</h2></legend>

			<!-- <div>
				<input
					type="checkbox"
					id="general"
					bind:group={checkedThemes}
					value="general"
					name="general"
					on:change={updateFilter}
				/>
				<label for="general">Général (aucun autre thème)</label>
			</div> -->
			{#each filteredThemes as theme}
				<div>
					<input
						type="checkbox"
						id={theme.id}
						bind:group={checkedThemes}
						value={theme.id}
						name={theme.id}
						on:change={updateFilter}
					/>
					<label for={theme.id}>{theme.name}</label>
				</div>
				<!-- <a href="theme/{theme.id}">{theme.name}</a> -->
				<!-- ({discipline.expand['ressources(disciplines)'].length} ressource{discipline.expand[
						'ressources(disciplines)'
					].length == 1
						? ''
						: 's'}) -->
				{#if $currentUser}
					{#if $currentUser.id == theme.user}
						<form method="POST" action="/discipline/{theme.id}/delete">
							<button>Supprimer</button>
						</form>
					{/if}
				{/if}
			{/each}
		</fieldset>
		<a on:click={resetThemes} class="">Tout déselectionner</a>
	</section>
</div>

<br />
<br />
<h2 class="text-lg font-bold mt-4 mb-2">Ressources :</h2>

{#each data.groupsobj as group}
	<h3 class="text-base font-bold mt-2 mb-2">{group.name} :</h3>
	{#each filteredRessources as ressource}
		{#if ressource.expand['ressourcegroup'] !== undefined}
			{#if ressource.expand['ressourcegroup'].id == group.id}
				<div class="border border-slate-300 my-3 bg-white px-2 py-1 rounded">
					
					<b>{ressource.name}</b>
					{#if ressource.url != ''}
						<a href={ressource.url}>{ressource.url}</a>
					{/if}
					<br />
					Type :
					{#if ressource.expand['ressourcetype'] !== undefined}
						[{ressource.expand['ressourcetype'].name}]
					{/if}
					<br />

					Disciplines :
					{#if ressource.expand['disciplines'] !== undefined}
						{#each ressource.expand['disciplines'] as disc}
							<span>[{disc.name}] </span>
						{/each}
					{/if}
					<br />

					Themes :
					{#if ressource.expand['themes'] !== undefined}
						{#each ressource.expand['themes'] as theme}
							<span>[{theme.name}] </span>
						{/each}
					{/if}
					<br />
					Langues :
					{#if ressource.languages != ''}
						{#each ressource.languages.split(',') as language}
							<span>[{language.trim()}] </span>
						{/each}
					{/if}

				</div>
			{/if}
		{/if}
	{/each}
{/each}

<section>
	<div>
		<br />
		<br />
		<br />
		<br />
		Ajouter une discipline :

		<form method="POST" action="?/addDiscipline" use:enhance>
			<div>
				<label for="name">Nom</label>
				<input type="text" id="name" name="name" disabled={!$currentUser} />
			</div>

			<button type="submit" disabled={!$currentUser}>Ajouter</button>
		</form>
	</div>
</section>

Ajouter une ressource :
