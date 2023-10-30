<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	console.log(data);
</script>
<svelte:head>
    <title>{data.indivrecordobj.name} | Introdb.mocob.org</title> 
</svelte:head>


<h2 class="h3 mt-4 mb-4">{data.indivrecordobj.name}</h2>
<!-- <h3 class="h5 mt-4 mb-4">Liste des ressources</h3> -->

<div class="mb-5">
	{#each data.ressourceslist as ressource}
		<div class="my-2 border border-dark-subtle bg-white px-3 py-3">
			<div class="">
				<div>
					<div class="">{ressource.name}</div>
					<div class="mt-1">
						{#if ressource.tags != ''}
							{#each ressource.tags.split(',') as tag}
								<span class="badge text-bg-secondary me-1">{tag}</span>
							{/each}
						{:else}
							<span class="badge text-bg-secondary">Pas de tag</span>
						{/if}
					</div>
					<!-- <div class="d-flex justify-content-end">/</div> -->
				</div>
				<!-- <div class="mt-2">votes</div> -->
				<div class="bg-light mt-3 pt-1 border">
					{#if ressource.expand['votes(ressource)'] !== undefined}
						{#each ressource.expand['votes(ressource)'] as vote}
							<div class="border-start border-dark-subtle small mt-1 mb-2 ps-2 ms-2">
								{vote.expand.value.value} : {vote.comment}
							</div>
						{/each}
					{:else}
						<div class="border-start border-dark-subtle small mt-1 mb-2 ps-2 ms-2 text-muted">
							<i>Pas encore de commentaire</i>
						</div>
					{/if}
					<div class="small ms-2 mt-3">
						<form method="POST" action="?/addVote" use:enhance>
							<label class="mb-1">
								Voter :
								<select name="value">
									{#each data.vote_values as votevalue}
										<option value={votevalue.id}>{votevalue.value}</option>
									{/each}
								</select>
							</label>
							<label class="mb-1">
								Commentaire :
								<input name="comment" type="text" />
							</label>
							<input name="ressource" type="hidden" value="{ressource.id}" />
							<button class="mb-1">Ajouter</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	{:else}
		Aucune ressource
	{/each}
</div>

<hr />

<div class="mt-4 mb-4">
	<div class="my-1 border border-dark-subtle bg-white px-2 py-1">
		<div class="">
			Ajouter une ressource :

			<form method="POST" action="?/addRessource" use:enhance>
				<div class="mb-3">
					<label for="name" class="form-label">Nom</label>
					<input type="text" class="form-control" id="name" name="name" />
				</div>

				<div class="mb-3">
					<label for="name" class="form-label">Lien (facultatif, dans le cas d'un site)</label>
					<input type="text" class="form-control" id="url" name="url" />
				</div>

				<div class="mb-3">
					<label for="name" class="form-label">Tags séparés par des virgules</label>
					<input
						type="text"
						class="form-control"
						id="tags"
						name="tags"
						aria-describedby="tagsHelp"
					/>
					<div id="tagsHelp" class="form-text">
						Par exemple : Géométrie, Accessible, Exercices. Pour préciser si c'est une ressource
						générale ou plus précise.
					</div>
				</div>

				<button type="submit" class="btn btn-primary">Ajouter</button>
			</form>
		</div>
	</div>
</div>

<hr />

<style>
	hr {
		margin-top: 0.2rem;
		margin-bottom: 0.2rem;
	}
</style>
