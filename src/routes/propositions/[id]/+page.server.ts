import { pb } from '$lib/pocketbase'
import type { PageServerLoad, Actions } from './$types';
import { onMount } from 'svelte'
import { fail, redirect } from "@sveltejs/kit"

export const load = (async ({ params }) => {
    const proposition = await pb.collection('propositions').getOne(params.id, {
        expand: 'relField1,relField2.subRelField',
    });
    const sources = await pb.collection('source').getList(1, 50, {
        filter: `proposition = "${params.id}"`,
        sort: '-created',
    });
    
    return {
        indivrecordobj: JSON.parse(JSON.stringify(proposition)),
        sourceslist: JSON.parse(JSON.stringify(sources)),
    };
}) satisfies PageServerLoad;


export const actions = {
    ajouterSource: async ({ request, locals, params }) => {
  
      if (!locals.pb.authStore.isValid) {
        throw redirect(303, '/login')
      }
  
      const formdata = await request.formData();
      const data = {
        "contenu": formdata.get('source'),
        "user": locals.user.id,
        "proposition": params.id
      };
      console.log(data);
  
      try {
        const record = await pb.collection('source').create(data);
      } catch (err) {
        console.error(err)
        throw error(err.status, err.message)
      }
  
      return { success: true };
    }
  } satisfies Actions;