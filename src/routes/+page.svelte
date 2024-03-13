<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { currentUser, pb } from '$lib/pocketbase';

	export let data: PageData;
	//console.log(data);

	let allRessources = data.ressourcesobj;
	let allThemes = data.themesobj;
	let allBranchs = data.branchsofscienceobj;

	//console.log(data.themesobj);

	const allparentdisciplines = Object.values(data.disciplinesobj).filter(
		(item) => item.parentdisciplines.length == 0
	);
	const allchilddisciplines = Object.values(data.disciplinesobj).filter(
		(item) => item.parentdisciplines.length != 0
	);

	//console.log(filteredRessources);
	//console.log(Object.keys(data.ressourcesobj[0]));
</script>

<svelte:head>
	<title>introdb.mocob.org</title>
</svelte:head>
<!-- <p>Listes collaboratives de ressources d'introduction à différentes disciplines et thèmes.</p> -->


<div class="grid md:grid-cols-2 gap-4 mb-4">
	<div>
		<h2 class="text-xl font-bold mb-2">Thèmes</h2>
		<ul class="list-disc list-inside">
			{#each data.themesobj as theme}
				<li>
					<a href="#" class:text-gray-800={theme.expand['linkeddisciplines'] == undefined}>
						{theme.name}
					</a>{#if theme.expand['linkeddisciplines'] !== undefined}
						<small>
							({#each theme.expand['linkeddisciplines'] as linkeddiscipline, idx}<a
									href="#"
									class="text-blue-800"
									>{linkeddiscipline.name}{#if idx < theme.expand['linkeddisciplines'].length - 1},
									{/if}</a
								>{/each})
						</small>{/if}
				</li>
			{/each}
		</ul>
	</div>

	<div>
		<h2 class="text-xl font-bold mb-2">Branches et disciplines</h2>

		{#each data.branchsofscienceobj as branch}
			<h3 class="text-base font-bold mt-2 mb-2">{branch.name}</h3>
			{#each allparentdisciplines as parentdiscipline}
				{#if parentdiscipline.branchs.includes(branch.id)}
					<ul class="list-disc list-inside">
						<li>
							<a href="/discipline/{parentdiscipline.id}" class:text-gray-800={parentdiscipline.ressourceCounter == 0} class:visited:text-gray-800={parentdiscipline.ressourceCounter == 0}>
								{parentdiscipline.name}
							</a>
							<small><span class="text-gray-700">({parentdiscipline.ressourceCounter}) {parentdiscipline.description}</span></small>
							<ul class="list-disc list-inside ml-5">
								{#each allchilddisciplines as childdiscipline}
									{#if childdiscipline.parentdisciplines.includes(parentdiscipline.id)}
										<li>
											<a href="/discipline/{childdiscipline.id}" class:text-gray-800={childdiscipline.ressourceCounter == 0} class:visited:text-gray-800={childdiscipline.ressourceCounter == 0}>
												{childdiscipline.name}
											</a>
											<small
												><span class="text-gray-700">({childdiscipline.ressourceCounter}) {childdiscipline.description}</span>
											</small>
											<ul class="list-disc list-inside ml-5">
												{#each allchilddisciplines as subchilddiscipline}
													{#if subchilddiscipline.parentdisciplines.includes(childdiscipline.id)}
														<li>
															<a href="/discipline/{subchilddiscipline.id}" class:text-gray-800={subchilddiscipline.ressourceCounter == 0} class:visited:text-gray-800={subchilddiscipline.ressourceCounter == 0}>
																{subchilddiscipline.name}
															</a>
															<small
																><span class="text-gray-700"
																	>({subchilddiscipline.ressourceCounter}) {subchilddiscipline.description}</span
																></small
															>
															<!-- TODO: faire un meilleur recursive "infini". possiblement generer un json complet serverside, puis juste l'afficher sans calcul ici -->
														</li>
													{/if}
												{/each}
											</ul>
										</li>
									{/if}
								{/each}
							</ul>
						</li>
					</ul>
				{/if}
			{/each}
		{/each}
	</div>
</div>
