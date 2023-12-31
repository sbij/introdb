import { pb } from '$lib/pocketbase'
import type { PageServerLoad, Actions } from './$types';
import { onMount } from 'svelte'
import { fail, redirect, error } from "@sveltejs/kit"



export const actions = {
    addRessource: async ({ request, locals, params }) => {

        if (!locals.pb.authStore.isValid) {
          throw redirect(303, '/login')
        }

        const formdata = await request.formData();

        const data = {
            "name": formdata.get('name'),
            "url": formdata.get('url'),
            "languages": formdata.get('languages'),
            "ressourcetype": formdata.get('ressource_type'),
            "discipline": params.id,
            "user": locals.user.id
        };
        console.log(data);

        try {
            const record = await pb.collection('ressources').create(data);
        } catch (err) {
            console.error(err)
            throw error(err.status, err.message)
        }

        return { success: true };
    },
    addVote: async ({ request, locals, params }) => {

        if (!locals.pb.authStore.isValid) {
          throw redirect(303, '/login')
        }

        const formdata = await request.formData();

        const data = {
            "comment": formdata.get('comment'),
            "value": formdata.get('value'),
            "ressource": formdata.get('ressource'),
            "user": locals.user.id
        };
        console.log(data);

        try {
            const record = await pb.collection('votes').create(data);
        } catch (err) {
            console.error(err)
            throw error(err.status, err.message)
        }

        return { success: true };
    }
} satisfies Actions;

export const load = (async ({ params }) => {
    const discipline = await pb.collection('disciplines').getOne(params.id, {
        expand: 'ressources,relField2.subRelField',
    });
    const ressources = await pb.collection('ressources').getFullList({
        filter: `disciplines ~ "${params.id}"`,
        expand: 'votes(ressource).value,votes(ressource).user,ressourcetype,user'
    });
    const vote_values = await pb.collection('vote_values').getFullList({
        sort: '-weight',
    });
    const ressource_types = await pb.collection('ressource_types').getFullList({
        sort: 'order',
    });
    /* const sources = await pb.collection('source').getList(1, 50, {
        filter: `proposition = "${params.id}"`,
        sort: '-created',
    }); */

    return {
        indivrecordobj: JSON.parse(JSON.stringify(discipline)),
        ressourceslist: JSON.parse(JSON.stringify(ressources)),
        vote_values: JSON.parse(JSON.stringify(vote_values)),
        ressource_types: JSON.parse(JSON.stringify(ressource_types)),
    };
}) satisfies PageServerLoad;

