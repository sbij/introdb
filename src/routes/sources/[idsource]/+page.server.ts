import { pb } from '$lib/pocketbase'
import type { PageServerLoad, Actions } from './$types';
import { onMount } from 'svelte'
import { fail, redirect } from "@sveltejs/kit"

export const load = (async ({ params }) => {
    const source = await pb.collection('source').getOne(params.idsource, {
        expand: 'proposition',
    });
    
    return {
      sourceobj: JSON.parse(JSON.stringify(source)),
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