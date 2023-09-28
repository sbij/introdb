<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { parse } from 'svelte/compiler';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;

	let textargument =
	"- les éoliennes ne devraient pas être développées comme source principale d'énergie [induction]\n-- les éoliennes sont polluantes\n-- les éoliennes sont néfastes pour la qualité de vie des humains et animaux\n-- les éoliennes sont bruyantes\n- l'éolien n'est pas vraiment mieux que les alternatives (niveau count, emissions de co2, ..) [deduction]\n-- le nucléaire est tout autant écologique si ce n'est mieux\n-- peut-être que c'est plus dangereux mais de manière négligeables\n===\n- aozijeoijezroijoijzer [induction]";

	let fullargument: any = {};
	fullargument.conclusion = {};
	fullargument.conclusion.content = '';
	fullargument.conclusion.inferencetype = '';
	fullargument.premisses = [];

	function checkSubPremisses(arrayindex: number) {
		console.log(arrayindex);
	}

	function parseArgument(textargument: string) {
		textargument = textargument.replaceAll('\n-', '~\n-~-');
		textargument = textargument.replaceAll('<', '');
		textargument = textargument.replaceAll('>', '');
		let tmpparsedargument = new Array();

		/* var argument = {};
		argument.conclusion = {};
		//argument.conclusion.id = '12';
		//argument.conclusion.name = 'hello';
		argument.premisses = [];
		//argument.premisses.push(''); */

		let lines = textargument.split('~\n-~');
		fullargument = {};
		fullargument.conclusion = {};
		fullargument.conclusion.content = '';
		fullargument.conclusion.inferencetype = '';
		fullargument.premisses = [];

		for (var i = 0; i < lines.length; i++) {
			if (lines[i].startsWith('-#')) {
				if (fullargument.conclusion.content != '') {
					console.log('erreur y a deja une conclusion');
				} else {
					fullargument.conclusion.content = lines[i].substring(2).trim();

					if (lines[i + 1] !== undefined) {
						if (lines[i + 1].startsWith('-[inf]')) {
							fullargument.conclusion.inferencetype = lines[i + 1].substring(7).trim();
							i += 1;
						}
					}
				}
			} else if (lines[i].startsWith('- ')) {
				let tmppremisse: any = {};
				tmppremisse.content = lines[i].substring(1).trim();

				if (lines[i + 1] !== undefined) {
					if (lines[i + 1].startsWith('-)')) {
						tmppremisse.source = lines[i + 1].substring(2).trim();
						i += 1;
					}
				}
				if (lines[i + 1] !== undefined) {
					if (lines[i + 1].startsWith('-- ')) {
						console.log('exists 1 subpremisse');
					}
				}
				fullargument.premisses.push(tmppremisse);
			}

			/* 
			let newline = line.split('\n');
			newline = newline.map((x) => x.trim());
			if (newline[0].startsWith('-)')) {
				newline[0] = newline[0].replace(
					'-)',
					"<span style='font-weight: bold; margin-left:5ch;'>-)</span>"
				);
			}

			if (newline.length > 1) {
				for (var i = 1; i < newline.length; i++) {
					newline[i] = "<span style='margin-left:2ch;'>" + newline[i] + '</span>';
				}

			} */

			//tmpparsedargument.push(newline);
		}
		//parsedargument = textargument.split('\n-');
		//console.log(tmpparsedargument);
		console.log(fullargument);
	}

	$: parseArgument(textargument);
</script>

<div class="container">
	hello




	<br>
	<button
		class="btn btn-primary"
		type="button"
		data-bs-toggle="collapse"
		data-bs-target="#collapseExample"
		aria-expanded="false"
		aria-controls="collapseExample"
	>
		Afficher détails syntaxe
	</button>

	<div class="collapse" id="collapseExample">
		<div class="card card-body">
			<p class="font-monospace">
				Syntax:
				<br />
				-# prémisse faisant office de conclusion
				<br />
				-= déduction (type d'inférence);external:issound:isvalid (-#> ?)
				<br />
				- les éoliennes sont polluantes (prémisse)
				<br />
				-) lien vers une source
				<br />
				- autre prémisse
				<br />
				-) autre source
				<br />
				-= déduction
				<br />
				-- sous prémisse
				<br />
				-- sousprémisse 2
				<br />
				-) source
				<br />
				-/ contre prémisse
				<br />
				<br />
				ou alors remplacer -# par -
			</p>
		</div>
	</div>

	<hr />

	render:
	<br />
	<!-- <code> -->
	<!-- {@html parsedargument} -->
	<p class="font-monospace small">
		<br />
		<b>conclusion :</b><br />
		-# {@html fullargument.conclusion.content}<br />
		-[inf] {@html fullargument.conclusion.inferencetype}<br /><br />
		<b>prémisses :</b><br />
		{#each fullargument.premisses as premisse}
			- {@html premisse.content}<br />
			{#if premisse.source}
				<span style="margin-left: 2ch;">(source : {@html premisse.source})</span><br />
			{/if}
		{/each}
	</p>

	<br />

	<br />
	input:
	<br />
	<textarea bind:value={textargument} rows="20" />
</div>

<style>
	textarea {
		width: 100%;
		font-family: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
			monospace;
		font-size: 15px;
	}
</style>
