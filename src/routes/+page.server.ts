import { pb } from '$lib/pocketbase'
import type { PageServerLoad, Actions } from './$types';
import { onMount } from 'svelte'
import { fail, redirect, error } from "@sveltejs/kit"



export const actions = {
  addSubject: async ({ request, locals, params }) => {

      if (!locals.pb.authStore.isValid) {
        throw redirect(303, '/login')
      }

      const formdata = await request.formData();

      const data = {
          "name": formdata.get('name'),
          "url": formdata.get('name'),
          "user": locals.user.id
      };
      console.log(data);

      try {
          const record = await pb.collection('subjects').create(data);
      } catch (err) {
          console.error(err)
          throw error(err.status, err.message)
      }

      return { success: true };
  },
} satisfies Actions;

export const load = (async () => {
  const records = await pb.collection('subjects').getFullList({
    sort: 'name',
    expand: 'ressources(subject)'
  });

  return {
    recordsobj: JSON.parse(JSON.stringify(records)),
  };
}) satisfies PageServerLoad;

