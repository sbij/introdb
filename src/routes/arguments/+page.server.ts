import { pb } from '$lib/pocketbase'
import type { PageServerLoad, Actions } from './$types';
import { onMount } from 'svelte'
import { fail, redirect, error } from "@sveltejs/kit"


export const actions = {
  ajouterArgument: async ({ request, locals }) => {

    if (!locals.pb.authStore.isValid) {
      throw redirect(303, '/login')
    }

    const formdata = await request.formData();
    const data = {
      "contenu": formdata.get('proposition'),
      "user": locals.user.id
    };
    console.log(data);

    try {
      const record = await pb.collection('propositions').create(data);
    } catch (err) {
      console.error(err)
      throw error(err.status, err.message)
    }

    return { success: true };
  }
} satisfies Actions;

export const load = (async () => {
  const propositionslist = await pb.collection('propositions').getFullList({
    sort: '-created',
  });
  const inferencetypeslist = await pb.collection('types_inferences').getFullList({
    sort: 'ordre',
});

  return {
    recordsobj: JSON.parse(JSON.stringify(propositionslist)),
    inferencetypeslistobj: JSON.parse(JSON.stringify(inferencetypeslist)),
  };
}) satisfies PageServerLoad;

