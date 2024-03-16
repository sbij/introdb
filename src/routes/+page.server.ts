import { pb } from '$lib/pocketbase';
import type { PageServerLoad, Actions } from './$types';
import { onMount } from 'svelte';
import { fail, redirect, error } from '@sveltejs/kit';

export const load = (async () => {
	const disciplines = await pb.collection('disciplines').getFullList({
		sort: 'name'
		//,expand: 'ressources(disciplines)'
	});
	const themes = await pb.collection('themes').getFullList({
		sort: 'name',
		expand: 'linkeddisciplines'
	});
	const branchsofscience = await pb.collection('branchsofscience').getFullList({
		sort: 'order'
	});
	const ressources = await pb.collection('ressources').getFullList({
		//expand: 'disciplines, themes, ressourcegroup, ressourcetype, votes(ressource).value,votes(ressource).user'
		//expand: 'ressources(disciplines)'
	});

	/*
    filteredRessources = allRessources.filter(
				(ress) =>
					checkedDisciplines.every((r) => ress.disciplines.includes(r)) &&
					checkedThemes.every((r) => ress.themes.includes(r))
			);

		filteredDisciplines = allDisciplines.filter((disc) =>
			filteredRessources.some((r) => r.disciplines.includes(disc.id))
		);



      const numbers = [4, 9, 16, 25];
      const newArr = numbers.map(Math.sqrt)

      //Multiply all the values in an array with 10:
      const numbers = [65, 44, 12, 4];
      const newArr = numbers.map(myFunction)

      function myFunction(num) {
        return num * 10;
      }

    */

	// for each discipline we count number of ressources
	// first we count the number of ressources for each discipline
	var discdict: { [index: string]: any } = {};
	ressources.forEach((ressource) => {
		ressource['disciplines'].forEach((discid: string) => {
			if (discid in discdict) {
				discdict[discid] += 1;
			} else {
				discdict[discid] = 1;
			}
		});
	});

	// then we add the count of ressources to the discipline. and set 0 if there are none
	disciplines.forEach((elem) => {
		if (elem['id'] in discdict) {
			elem['ressourceCounter'] = discdict[elem['id']];
		} else {
			elem['ressourceCounter'] = 0;
		}
	});

	console.log(themes);

	// for each theme, we attach the number of ressources of each linked discipline, and save the sum
	themes.forEach((elem) => {
		elem['subressourceCounter'] = 0;
		if (elem.expand['linkeddisciplines'] != undefined) {
			elem.expand['linkeddisciplines'].forEach((elem2: any) => {
				if (elem2['id'] in discdict) {
					elem2['ressourceCounter'] = discdict[elem2['id']];
					elem['subressourceCounter'] += discdict[elem2['id']];
				} else {
					elem2['ressourceCounter'] = 0;
				}
			});
		}
	});

	/* function addRessourceCounter(discip: object) {
		return discip * 10;
	}
	const newArr = disciplines.map(addRessourceCounter); */

	return {
		disciplinesobj: JSON.parse(JSON.stringify(disciplines)),
		themesobj: JSON.parse(JSON.stringify(themes)),
		branchsofscienceobj: JSON.parse(JSON.stringify(branchsofscience)),
		ressourcesobj: JSON.parse(JSON.stringify(ressources))
	};
}) satisfies PageServerLoad;
