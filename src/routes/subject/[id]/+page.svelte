<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	console.log(data);
</script>

<svelte:head>
	<title>{data.indivrecordobj.name} | Introdb.mocob.org</title>
</svelte:head>

<h2>{data.indivrecordobj.name}</h2>
<!-- <h3 class="h5 mt-4 mb-4">Liste des ressources</h3> -->

<ul class="list-group mt-3 shadow-sm">
	{#each data.ressourceslist as ressource, i}
		<li class="list-group-item">
			<div class="mt-1">
				<div>
					<div class="">
						<div>{ressource.name}
						
							{#if ressource.url != ''}
							<a href="{ressource.url}">{ressource.url}</a>
							{/if}
						</div>
						<div class="mt-1">
							{#if ressource.tags != ''}
								{#each ressource.tags.split(',') as tag}
									<span class="badge text-bg-dark me-1">{tag}</span>
								{/each}
							{/if}
						</div>
					</div>
				</div>
				<!-- <div class="mt-2">votes</div> -->
				<div class="border-start mt-3 ms-2">
					<div class="">
						<ul class="list-group list-group-flush p-0 m-0">
							{#if ressource.expand['votes(ressource)'] !== undefined}
								{#each ressource.expand['votes(ressource)'] as vote}
									<li class="list-group-item px-2 py-1 m-0 list-group-item-light">
										<span class="badge text-bg-secondary">{vote.expand.value.value}</span>
										{vote.comment}
									</li>
								{/each}
							{/if}
							<li class="list-group-item px-2 py-1 m-0 list-group-item-light">
								<button
									class="btn btn-link btn-sm p-0 text-decoration-none"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target="#divcomment{i}"
									aria-expanded="false"
									aria-controls="divcomment{i}"
								>
									Commenter
								</button>
							</li>
						</ul>
						<div class="mt-1 ps-2">
							<div class="collapse" id="divcomment{i}">
								<form method="POST" action="?/addVote" use:enhance>
									<label>
										Voter :
										<select name="value">
											{#each data.vote_values as votevalue}
												<option value={votevalue.id}>{votevalue.value}</option>
											{/each}
										</select>
									</label><br />
									<label>
										Commentaire :
										<input name="comment" type="text" />
									</label><br />
									<input name="ressource" type="hidden" value={ressource.id} />
									<button>Ajouter</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</li>
	{:else}
		Aucune ressource
	{/each}
</ul>

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
					<label for="url" class="form-label">Lien (facultatif, dans le cas d'un site)</label>
					<input type="text" class="form-control" id="url" name="url" />
				</div>

				<div class="mb-3">
					<label for="tags" class="form-label">Tags séparés par des virgules</label>
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
</style>
