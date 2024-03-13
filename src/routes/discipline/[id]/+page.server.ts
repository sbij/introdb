import { pb } from '$lib/pocketbase'
import type { PageServerLoad, Actions } from './$types';
import { onMount } from 'svelte'
import { fail, redirect, error } from "@sveltejs/kit"



export const load = (async ({ params }) => {
    const discipline = await pb.collection('disciplines').getOne(params.id, {
        expand: 'parentdisciplines, ressources(disciplines)',
    });

    const childrendisciplines = await pb.collection('disciplines').getFullList({
        filter: `parentdisciplines ?~ "${params.id}"`,
        //expand: 'votes(ressource).value,votes(ressource).user,ressourcetype,user'
    });

    const ressources = await pb.collection('ressources').getFullList({
        filter: `disciplines ?~ "${params.id}"`,
    });
    /* 
    const ressource_types = await pb.collection('ressource_types').getFullList({
        sort: 'order',
    }); */
    /* const sources = await pb.collection('source').getList(1, 50, {
        filter: `proposition = "${params.id}"`,
        sort: '-created',
    }); */

    return {
        disciplineobj: JSON.parse(JSON.stringify(discipline)),
        childrendisciplinesobj: JSON.parse(JSON.stringify(childrendisciplines)),
        ressourcesobj: JSON.parse(JSON.stringify(ressources)),
    };
}) satisfies PageServerLoad;

