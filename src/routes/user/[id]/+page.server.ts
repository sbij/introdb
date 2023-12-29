import { pb } from '$lib/pocketbase'
import type { PageServerLoad, Actions } from './$types';
import { onMount } from 'svelte'
import { fail, redirect, error } from "@sveltejs/kit"


export const actions = {
    updateUser: async ({ request, locals, params }) => {

        if (!locals.pb.authStore.isValid) {
            throw redirect(303, '/login')
        }

        const formdata = await request.formData();

        const data = {
            "name": formdata.get('name'),
            "description": formdata.get('description')
        };
        console.log(data);

        try {
            const record = await pb.collection('users').update(params.id, data);
        } catch (err) {
            console.error(err)
            throw error(err.status, err.message)
        }

        return { success: true };
    }
} satisfies Actions;

export const load = (async ({ params }) => {
    const user = await pb.collection('users').getOne(params.id);
    const votes = await pb.collection('votes').getFullList({
        filter: `user = "${params.id}"`,
        expand: 'ressource.discipline,value'
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

