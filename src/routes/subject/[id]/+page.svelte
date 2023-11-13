<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { currentUser, pb } from '$lib/pocketbase';

	export let data: PageData;
	console.log(data);

	let sortedRessources = data.ressourceslist;
	sortedRessources.forEach((element) => {
		element.ressourcevoteval = 0;
		if (element.expand['votes(ressource)'] != undefined) {
			element.expand['votes(ressource)'].forEach((subelement) => {
				console.log(subelement.expand.value.weight);
				element.ressourcevoteval = element.ressourcevoteval + subelement.expand.value.weight;
			});
		} else {
			element.ressourcevoteval = -100;
		}
	});
	sortedRessources.sort((a, b) => (a.ressourcevoteval > b.ressourcevoteval ? -1 : 1));

	console.log(sortedRessources);
</script>

<svelte:head>
	<title>{data.indivrecordobj.name} | Introdb.mocob.org</title>
</svelte:head>

<h2>{data.indivrecordobj.name}</h2>
<!-- <h3>Liste des ressources</h3> -->

<ul class="ressourceul">
	{#each sortedRessources as ressource, i}
		<li class="ressourceli">
			<div>
				<div>
					<div>
						<div>
							<!-- {ressource.ressourcevoteval} -->
							{#if ressource.expand && ressource.expand.ressourcetype}
								[{ressource.expand.ressourcetype.name}]
							{/if}
							<b>{ressource.name}</b>

							{#if ressource.url != ''}
								<a href={ressource.url}>{ressource.url}</a>
							{/if}
							{#if $currentUser}
								{#if $currentUser.id == ressource.user}
									<form
										method="POST"
										action="/ressource/{ressource.id}/delete"
										style="display:inline;"
									>
										<button>Supprimer</button>
									</form>
								{/if}
							{/if}
						</div>
						<div>
							Langues :
							{#if ressource.languages != ''}
								{#each ressource.languages.split(',') as language}
									<span>[{language.trim()}] </span>
								{/each}
							{/if}
						</div>
						<div>
							Catégories :
							{#if ressource.tags != ''}
								{#each ressource.tags.split(',') as tag}
									<span>[{tag.trim()}] </span>
								{/each}
							{/if}
						</div>
					</div>
				</div>
				<div>
					<div>
						<ul class="commentsul">
							<li>
								Commentaires :

								<ul>
									{#if ressource.expand['votes(ressource)'] !== undefined}
										{#each ressource.expand['votes(ressource)'] as vote}
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
														<form
															method="POST"
															action="/vote/{vote.id}/delete"
															style="display:inline;"
														>
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
							</li>
						</ul>
						<details>
								<summary>Ajouter un commentaire</summary>

								<form method="POST" action="?/addVote" use:enhance>
									<label>
										Voter :
										<select name="value" disabled={!$currentUser}>
											{#each data.vote_values as votevalue}
												<option value={votevalue.id}>{votevalue.value}</option>
											{/each}
										</select>
									</label><br />
									<label>
										Commentaire :
										<input name="comment" type="text" disabled={!$currentUser} />
									</label><br />
									<input name="ressource" type="hidden" value={ressource.id} />
									<button disabled={!$currentUser}>Ajouter</button>
								</form>
							</details>
					</div>
				</div>
			</div>
		</li>
	{:else}
		Aucune ressource
	{/each}
</ul>

<hr />

<div>
	<div>
		<div>
			Ajouter une ressource :

			<form method="POST" action="?/addRessource" use:enhance>
				<label>
					Voter :
					<select name="ressource_type" disabled={!$currentUser}>
						{#each data.ressource_types as type}
							<option value={type.id}>{type.name}</option>
						{/each}
					</select>
				</label><br />
				<div>
					<label for="name">Nom</label>
					<input name="name" type="text" disabled={!$currentUser} />
				</div>

				<div>
					<label for="url">Lien (facultatif, dans le cas d'un site)</label>
					<input name="url" type="text" disabled={!$currentUser} />
				</div>

				<div>
					<label for="tags">Catégories séparés par des virgules</label>
					<input
						type="text"
						class="form-control"
						id="tags"
						name="tags"
						aria-describedby="tagsHelp"
						disabled={!$currentUser}
					/>
					<div id="tagsHelp">
						Par exemple : Géométrie, Accessible, Exercices. Pour préciser si c'est une ressource
						générale ou plus précise.
					</div>
				</div>
				<div>
					<label for="languages">Langues séparés par des virgules</label>
					<input
						type="text"
						class="form-control"
						id="languages"
						name="languages"
						aria-describedby="languagesHelp"
						disabled={!$currentUser}
					/>
					<div id="languagesHelp">Par exemple : Anglais, Français.</div>
				</div>

				<button type="submit" disabled={!$currentUser}>Ajouter</button>
			</form>
		</div>
	</div>
</div>

<hr />

<style>
	details > summary {
		/* padding: 2px 6px;
  width: 15em;
  background-color: #ddd;
  border: none;
  box-shadow: 3px 3px 4px black; */
		color: #0059b8;
		cursor: pointer;
	}
	.ressourceli {
		margin-top: 15px;
		margin-bottom: 25px;
	}
	details {
		margin-top: 5px;
		margin-left: 25px;
	}
	.commentsul {
		margin-top: 5px;
	}
	.ressourceul {
		margin-left: 0;
		padding-left: 25px;
	}
</style>
