import { pb } from '$lib/pocketbase'
import type { PageServerLoad, Actions } from './$types';
import { onMount } from 'svelte'
import { fail, redirect } from "@sveltejs/kit"

export const load = (async ({ params }) => {
    const record = await pb.collection('propositions').getOne(params.id, {
        expand: 'relField1,relField2.subRelField',
    });
    
    return {
        indivrecordobj: JSON.parse(JSON.stringify(record)),
    };
}) satisfies PageServerLoad;

