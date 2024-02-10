import { pb } from '$lib/pocketbase'
import type { PageServerLoad, Actions } from './$types';
import { onMount } from 'svelte'
import { fail, redirect, error } from "@sveltejs/kit"



export const load = (async ({ params }) => {
    const ressource = await pb.collection('ressources').getOne(params.id, {
        expand: 'ressources,relField2.subRelField',
    });

    return {
        ressourceobj: JSON.parse(JSON.stringify(ressource)),
    };
}) satisfies PageServerLoad;

