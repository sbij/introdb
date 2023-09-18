<script lang="ts">
	import PropositionSelector from '$lib/propositionSelector.svelte';

	import { applyAction, enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	export let data: PageData;
	console.log(data.recordsobj);

	let showModal = '';
	let modalElementId = 0;
	let proptype;

	var argument = {};
	argument.conclusion = '';
	argument.premisses = [];
	//argument.premisses.push('');
	console.log(argument);
	console.log(Object.keys(argument.premisses));
	//console.log(JSON.stringify(employees));
	function toggleModal(id: string) {
		if (showModal && id == showModal) {
			showModal = '';
		} else {
			showModal = id;
		}
	}
</script>

<h1>Argument builder</h1>

<div class="container">
	<div class="row">
		<div class="col-sm-6">
			<h2>Conclusion</h2>

			<div class="list-group">
				<a
					href="#"
					on:click|preventDefault={() => (
						toggleModal('-1'), ((modalElementId = 0), (proptype = 'conclusion'))
					)}
					class="list-group-item list-group-item-action"
					class:active={showModal === '-1'}
					aria-current={showModal === '-1'}
					>cliquer pour ajouter une proposition / {argument.conclusion}</a
				>
			</div>

			<br />
			<br />

			<h2>Prémisses</h2>
			<div class="list-group">
				{#each Object.keys(argument.premisses) as premissenb}
					<a
						href="#"
						on:click|preventDefault={() => (
							toggleModal(premissenb), ((modalElementId = premissenb), (proptype = 'premisse'))
						)}
						class="list-group-item list-group-item-action"
						class:active={showModal === premissenb}
						aria-current={showModal === premissenb}
					>
						{premissenb} : {argument.premisses[premissenb]}
					</a>
				{/each}

				<a
						href="#"
						on:click|preventDefault={() => (
							toggleModal('-2'), ((modalElementId = '-2'), (proptype = 'premisse'))
						)}
						class="list-group-item list-group-item-action"
						class:active={showModal === '-2'}
						aria-current={showModal === '-2'}
					>
					cliquer pour ajouter une autre proposition
					</a>
			</div>

			<br />full argument: {argument.conclusion} / {argument.premisses}

			<form method="POST" action="?/ajouterArgument" use:enhance>
				<input id="conclusion" name="conclusion" type="hidden" value={argument.conclusion} />
				<input id="premisses" name="premisses" type="hidden" value={argument.premisses.join(',')} />
				<button type="submit" class="btn btn-primary mb-3">ajouter argument</button>
			</form>
		</div>

		<div class="col-sm-6" id="propSelectorSide">
			{#if showModal}
				<PropositionSelector
					elementId={modalElementId}
					bind:argumentJson={argument}
					{proptype}
					propositionsList={data.recordsobj}
					onClose={() => (showModal = 0)}
				/>
			{/if}
		</div>
	</div>
</div>
