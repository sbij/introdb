<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	console.log(data.indivrecordobj);
	console.log(data.sourceslist);
</script>

<a href="/propositions">Retour aux propositions</a><br />
<br />
<hr />
<p>Proposition :</p>
<h1 class="h4" style=""><b>{data.indivrecordobj.contenu}</b></h1>
<hr />

<h2 class="h5 mt-5" style="">Justifications de cette proposition :</h2>

<h3 class="h6" style="">Arguments :</h3>

<div class="row mt-3 mb-4">
	ok
</div>
<a href="#" class="btn btn-primary">Ajouter des prémisses</a>

<h3 class="h6 mt-5" style="">Sources :</h3>

<div class="row mt-3 mb-4">
	{#each data.sourceslist.items as source}
		<div class="col-xl-3 col-lg-4 col-sm-6 mb-3">
			<div class="card">
				<div class="card-body">
					<p class="card-text">
						{source.contenu}
					</p>
					<a href="/sources/{source.id}" class="card-link">Voir</a>
				</div>
			</div>
		</div>
	{:else}
		Pas de source en justification.
	{/each}
</div>
<a href="#" class="btn btn-primary">Ajouter une source</a>

<form method="POST" action="?/ajouterSource" use:enhance>
	<div class="mb-3">
		<label for="source" class="form-label"><b>Ajouter une source :</b></label>
		<input class="form-control" type="text" id="source" name="source" required minlength="4" />
	<button type="submit" class="btn btn-primary mb-3">Ajouter</button>
</form>

<br />
<br />
<br />
<br />
<br />

<div class="row mt-3 mb-4">
	<div class="col-xl-3 col-lg-4 col-sm-6 mb-3">
		<div class="card">
			<div class="card-body">
				<h5 class="card-title">Special title treatment</h5>
				<p class="card-text">
					With supporting text below as a natural lead-in to additional content.
				</p>
				<a href="#" class="btn btn-primary">Go somewhere</a>
			</div>
		</div>
	</div>
	<div class="col-xl-3 col-lg-4 col-sm-6">
		<div class="card">
			<div class="card-body">
				<h5 class="card-title">Special title treatment</h5>
				<p class="card-text">
					With supporting text below as a natural lead-in to additional content.
				</p>
				<a href="#" class="btn btn-primary">Go somewhere</a>
			</div>
		</div>
	</div>
	<div class="col-xl-3 col-lg-4 col-sm-6">
		<div class="card">
			<div class="card-body">
				<h5 class="card-title">Special title treatment</h5>
				<p class="card-text">
					With supporting text below as a natural lead-in to additional content.
				</p>
				<a href="#" class="btn btn-primary">Go somewhere</a>
			</div>
		</div>
	</div>
	<div class="col-xl-3 col-lg-4 col-sm-6">
		<div class="card">
			<div class="card-body">
				<h5 class="card-title">Special title treatment</h5>
				<p class="card-text">
					With supporting text below as a natural lead-in to additional content.
				</p>
				<a href="#" class="btn btn-primary">Go somewhere</a>
			</div>
		</div>
	</div>
	<div class="col-xl-3 col-lg-4 col-sm-6">
		<div class="card">
			<div class="card-body">
				<h5 class="card-title">Special title treatment</h5>
				<p class="card-text">
					With supporting text below as a natural lead-in to additional content.
				</p>
				<a href="#" class="btn btn-primary">Go somewhere</a>
			</div>
		</div>
	</div>
	<div class="col-xl-3 col-lg-4 col-sm-6">
		<div class="card">
			<div class="card-body">
				<h5 class="card-title">Special title treatment</h5>
				<p class="card-text">
					With supporting text below as a natural lead-in to additional content.
				</p>
				<a href="#" class="btn btn-primary">Go somewhere</a>
			</div>
		</div>
	</div>
	<div class="col-xl-3 col-lg-4 col-sm-6">
		<div class="card">
			<div class="card-body">
				<h5 class="card-title">Special title treatment</h5>
				<p class="card-text">
					With supporting text below as a natural lead-in to additional content.
				</p>
				<a href="#" class="btn btn-primary">Go somewhere</a>
			</div>
		</div>
	</div>
	<div class="col-xl-3 col-lg-4 col-sm-6">
		<div class="card">
			<div class="card-body">
				<h5 class="card-title">Special title treatment</h5>
				<p class="card-text">
					With supporting text below as a natural lead-in to additional content.
				</p>
				<a href="#" class="btn btn-primary">Go somewhere</a>
			</div>
		</div>
	</div>
</div>

<h2 class="h5 mt-5">Liste des arguments où cette proposition est une prémisse :</h2>
<p>Qu'est-ce que cet argument sert à défendre ?</p>
