<script lang="ts">
	import { onDestroy } from 'svelte';
	export let onClose;
	export let elementId;
	export let argumentJson;
	export let propositionsList;
	export let proptype;

	let searchString = '';
	$: allPropositions = propositionsList;
	console.log(propositionsList);
	$: filteredPropositions = allPropositions.filter((prop: { contenu: string }) => {
		return prop.contenu.toLowerCase().includes(searchString.toLowerCase());
	});

	console.log('will i log destroyed on button click ? ' + elementId);
	onDestroy(() => console.log('destroyed ' + elementId));

	console.log(argumentJson);

	function addNew(newPremisse: string) {
		argumentJson.premisses.push(newPremisse);
		$: argumentJson = argumentJson;
	}
</script>

<div class="card">
	<div class="card-body">
		<div>
			<h3>Hi I'm a modal <span on:click={onClose}>X</span></h3>
		</div>

		<p>hello prop selector test. id: {elementId} {proptype}</p>

		<!-- argumentJson.premisses[elementId] -->
		<div class="mb-3">
			<label for="proposition" class="form-label"><b>Filtrer/ajouter une proposition :</b></label>

			<input
				class="form-control"
				type="text"
				id="proposition"
				name="proposition"
				required
				minlength="4"
				bind:value={searchString}
			/>
		</div>

		Ajouter nouvelle proposition :
		<ul class="list-group mt-3">
			<li class="list-group-item d-flex justify-content-between align-items-center">
				{searchString}<a href="#" on:click|preventDefault={() => addNew(searchString)}
					><span class="badge text-bg-primary rounded-pill">Créer et ajouter/remplacer</span></a
				>
			</li>
		</ul>
		<br />
		Ajouter proposition existante :
		<ul class="list-group mt-3">
			{#each filteredPropositions as prop}
				<li class="list-group-item d-flex justify-content-between align-items-center">
					{prop.contenu}
					{#if proptype == 'conclusion'}
						<a href="#" on:click|preventDefault={() => (argumentJson.conclusion = prop.id)}
							><span class="badge text-bg-primary rounded-pill">Définir comme conclusion</span></a
						>
					{:else if elementId == '-2'}
						<a
							href="#"
							on:click|preventDefault={() => addNew(prop.id)}
							><span class="badge text-bg-primary rounded-pill">Ajouter</span></a
						>
					{:else}
						<a
							href="#"
							on:click|preventDefault={() => (argumentJson.premisses[elementId] = prop.id)}
							><span class="badge text-bg-primary rounded-pill">Remplacer</span></a
						>
					{/if}
				</li>
			{/each}
		</ul>

		<br />
	</div>
</div>

<style>
	span {
		color: blue;
		cursor: pointer;
	}
	span:hover {
		color: red;
	}
</style>
