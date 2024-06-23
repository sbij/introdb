<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	console.log(data);
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
					<a href="#">
						{theme.name}
					</a>
					<small class="text-gray-700">
						(disciplines : {#each theme.themesToDisciplines as linkeddiscipline, idx}<a
								href="/discipline/{linkeddiscipline.discipline.id}"
								>{linkeddiscipline.discipline.name}</a
							>{#if idx < theme.themesToDisciplines.length - 1},
							{/if}{/each})
					</small>
				</li>
			{/each}
		</ul>
	</div>

	<div>
		<h2 class="text-xl font-bold mb-2">Branches et disciplines</h2>

		{#each data.branchsobj as branch}
			<h3 class="text-base font-bold mt-2 mb-2">{branch.name}</h3>
			{#each data.disciplinesobj as parentdiscipline}
				{#if parentdiscipline.disciplines_to_branchs && parentdiscipline.disciplines_to_branchs.branchId == branch.id && !parentdiscipline.disciplines_to_parent_discip}
					<ul class="list-disc list-inside">
						<li>
							<a href="/discipline/{parentdiscipline.disciplines.id}">
								{parentdiscipline.disciplines.name}
							</a>
							{#if parentdiscipline.disciplines.description}
								<small
									><span class="text-gray-700">{parentdiscipline.disciplines.description}</span
									></small
								>
							{/if}
							<ul class="list-disc list-inside ml-5">
								{#each data.disciplinesobj as childdiscipline}
									{#if childdiscipline.disciplines_to_parent_discip && childdiscipline.disciplines_to_parent_discip.parentId == parentdiscipline.disciplines.id}
										<li>
											<a href="/discipline/{childdiscipline.disciplines.id}"
												>{childdiscipline.disciplines.name}</a
											>
											{#if childdiscipline.disciplines.description}
												<small
													><span class="text-gray-700"
														>{childdiscipline.disciplines.description}</span
													></small
												>
											{/if}
											<ul class="list-disc list-inside ml-5">
												{#each data.disciplinesobj as schilddiscipline}
													{#if schilddiscipline.disciplines_to_parent_discip && schilddiscipline.disciplines_to_parent_discip.parentId == childdiscipline.disciplines.id}
														<li>
															<a href="/discipline/{schilddiscipline.disciplines.id}"
																>{schilddiscipline.disciplines.name}</a
															>
															{#if schilddiscipline.disciplines.description}
																<small
																	><span class="text-gray-700"
																		>{schilddiscipline.disciplines.description}</span
																	></small
																>
															{/if}
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

		<h3 class="text-base font-bold mt-2 mb-2">Disciplines without branch</h3>
		{#each data.disciplinesobj as parentdiscipline}
			{#if !parentdiscipline.disciplines_to_branchs && !parentdiscipline.disciplines_to_parent_discip}
				<ul class="list-disc list-inside">
					<li>
						<a href="/discipline/{parentdiscipline.disciplines.id}">
							{parentdiscipline.disciplines.name}
						</a>
						{#if parentdiscipline.disciplines.description}
							<small
								><span class="text-gray-700">{parentdiscipline.disciplines.description}</span
								></small
							>
						{/if}
					</li>
				</ul>
			{/if}
		{/each}
	</div>
</div>
