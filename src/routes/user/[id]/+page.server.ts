import { pb } from '$lib/pocketbase'
import type { PageServerLoad, Actions } from './$types';
import { onMount } from 'svelte'
import { fail, redirect, error } from "@sveltejs/kit"



export const load = (async ({ params }) => {
    const user = await pb.collection('users').getOne(params.id);
    const votes = await pb.collection('votes').getFullList({
        filter: `user = "${params.id}"`,
        expand: 'ressource.subject,value'
    });
    /* const sources = await pb.collection('source').getList(1, 50, {
        filter: `proposition = "${params.id}"`,
        sort: '-created',
    }); */

    return {
        indivrecordobj: JSON.parse(JSON.stringify(user)),
        ressourceslist: JSON.parse(JSON.stringify(votes)),
    };
}) satisfies PageServerLoad;

