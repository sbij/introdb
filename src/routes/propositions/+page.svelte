<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;

	let searchString = '';
	let allPropositions = data.recordsobj;
	$: allPropositions = data.recordsobj;
	$: filteredPropositions = allPropositions.filter((prop: { contenu: string }) => {
		return prop.contenu.toLowerCase().includes(searchString.toLowerCase());
		console.log(prop.contenu.toLowerCase().split(' '));
		console.log(searchString.toLowerCase().split(' '));
		//let ok = array2.filter(x => array1.some(a => x.includes(a)));
		//let ok = prop.contenu.toLowerCase().split(" ").filter(x => searchString.toLowerCase().split(" ").some(a => x.includes(a)));
		//let ok = prop.contenu.toLowerCase().split(" ").filter(r => r.includes(searchString.toLowerCase().split(" ")));
		console.log(ok);
		return ok;
		//return prop.contenu.toLowerCase().split(" ").some(r=> searchString.toLowerCase().split(" ").indexOf(r) >= 0);
	});
	console.log(data.recordsobj);
	function clearfilter() {
		searchString = '';
	}
</script>



<div class="container">
	<div class="row">
		<div class="col-sm-6">
			<form method="POST" action="?/ajouterProposition" use:enhance>
				<div class="mb-3">
					<label for="proposition" class="form-label"><b>Ajouter une proposition :</b></label>

					<input class="form-control" type="text" id="proposition" name="proposition" required minlength="4" bind:value={searchString} />
<!-- 
					<textarea
						class="form-control"
						id="proposition"
						name="proposition"
						rows="3"
						cols="33"
						bind:value={searchString}
					/> -->
				</div>
				<!-- <div class="mb-3">
					<label for="source" class="form-label">(Source :) pour l'instant on s'en occupe pas</label>
					<textarea class="form-control" id="source" name="source" rows="3" cols="33" />
				</div> -->
				<button type="submit" class="btn btn-primary mb-3">Ajouter</button>
			</form>
		</div>
		<div class="col-sm-6">
			<b>Explications sur les propositions :</b><br>
			
			Une <i>proposition</i> est une <i>phrase qui peut être vraie ou fausse</i>, par exemple "il pleut dehors" mais pas "comment vas-tu ?"
<br>
<br>
			Les <i>propositions</i> sont les <i>éléments de base</i> qui vont former les <i><a href="/arguments">arguments</a></i>. Les <i>arguments</i> sont composés d'une proposition de <i>conclusion</i>, et d'une ou plusieurs propositions de <i>prémisses</i> qui vont supporter l'argument. 
			<br>
			<br>
			<a href="/apprendre">En apprendre plus</a>.
		</div>
	</div>
</div>

<br />
Liste des propositions : (?)

<div class="container">
	<div class="row">
		<div class="col-sm-6">
			Propositions semblables :
			{#if searchString != ''}
				<!-- <button on:click={clearfilter}>
					Supprimer le filtre "{searchString}"
				</button> -->
				<ul>
					{#each filteredPropositions as prop}
						<li><a href="/propositions/{prop.id}">{prop.contenu}</a></li>
					{/each}
				</ul>
			{/if}
		</div>
		<div class="col-sm-6">
			Toutes les propositions :
			<ul class="list-group mt-3">
				{#each allPropositions as prop}
					<li class="list-group-item d-flex justify-content-between align-items-center">{prop.contenu} <a href="/propositions/{prop.id}"><span class="badge text-bg-primary rounded-pill">Voir</span>
					</a></li>
				{/each}
			</ul>
			Voir tous, avec recherche avancée, filtrage par input, mais aussi voir ceux sans prémisses
		</div>
	</div>
</div>
