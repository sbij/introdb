<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;

	let allPropositions = data.recordsobj;
	$: allPropositions = data.recordsobj;

	let allInferenceTypes = data.inferencetypeslistobj;

	function ajouterChampPremisse() {
		count += 1;
	}
	function ajouterChampSource() {
		count += 1;
	}
</script>

Ajouter un argument : Liste des arguments :

<div class="container">
	<div class="row">
		<div class="col-sm-6">
			<form method="POST" action="?/ajouterArgument" use:enhance>
				<div class="mb-3">
					<label for="conclusion" class="form-label">Conclusion de l'argument :</label>
					invisible input avec l'id de la prop. pas besoin de faire un input ci-dessous
					<input
						class="form-control"
						name="conclusion"
						type="text"
						value="(Selectionnez une valeur à côté)"
						aria-label="Conclusion de l'argument"
						disabled
						readonly
					/>
				</div>

				<div class="mb-3">
					<label for="inferencetype" class="form-label">Type d'inférence :</label>
					<select
						class="form-select"
						aria-label="Inference type select"
						id="inferencetype"
						name="inferencetype"
					>
						{#each allInferenceTypes as inf}
							<option value={inf.id}>{inf.nom}</option>
						{/each}
					</select>
				</div>

				Prémisses

				<button type="submit" class="btn btn-primary mb-3">Ajouter</button>
			</form>
		</div>
		<div class="col-sm-6">
			Champ input text qui cherche les premisses existantes, et si y a pas ça en crée une nouvelle.
			on filtre, avec des bouttons pour add, et en haut un boutton pour create
		</div>

		<div class="col-sm-6">
			Explications
			<br />
			<br />

			Conclusion : bla
			<br />
			Type d'inférence : c'est bla
			<br />
			Prémisses : c'est bla
		</div>
	</div>
</div>

<br />
Liste des propositions : - Arguments utilisant cette conclusion - Liste des arguments, avec champ filtre
