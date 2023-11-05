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
            "subject": params.id,
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
    const subject = await pb.collection('subjects').getOne(params.id, {
        expand: 'ressources,relField2.subRelField',
    });
    const ressources = await pb.collection('ressources').getFullList({
        filter: `subject = "${params.id}"`,
        expand: 'votes(ressource).value,votes(ressource).user'
    });
    const vote_values = await pb.collection('vote_values').getFullList({
        sort: '-weight',
    });
    /* const sources = await pb.collection('source').getList(1, 50, {
        filter: `proposition = "${params.id}"`,
        sort: '-created',
    }); */

    return {
        indivrecordobj: JSON.parse(JSON.stringify(subject)),
        ressourceslist: JSON.parse(JSON.stringify(ressources)),
        vote_values: JSON.parse(JSON.stringify(vote_values)),
    };
}) satisfies PageServerLoad;

