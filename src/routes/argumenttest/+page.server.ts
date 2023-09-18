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
    let data = {
      "conclusion": formdata.get('conclusion'),
      "premisses": formdata.get('premisses').split(","),
      "user": locals.user.id
    };
    console.log(data);

    let record;
    try {
      record = await pb.collection('argument').create(data);
    } catch (err) {
      console.error(err)
      throw error(err.status, err.message)
    }

    throw redirect(303, '/arguments/' + record.collectionId);

    return { success: true };
  }
} satisfies Actions;


export const load = (async () => {
  const records = await pb.collection('propositions').getFullList({
    sort: '-created',
  });

  return {
    recordsobj: JSON.parse(JSON.stringify(records)),
  };
}) satisfies PageServerLoad;

