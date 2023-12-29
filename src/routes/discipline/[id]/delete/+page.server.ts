import { pb } from '$lib/pocketbase'
import type { PageServerLoad, Actions } from './$types';
import { onMount } from 'svelte'
import { fail, redirect, error } from "@sveltejs/kit"

export const actions = {
  default: async ({ request, locals, params }) => {
    console.log("ok");

    if (!locals.pb.authStore.isValid) {
      throw redirect(303, '/login')
    }
    const discipline = await pb.collection('disciplines').getOne(params.id, {
    });
    console.log(discipline);
    console.log(discipline.user);
      if (discipline.user == locals.user.id) {

        try {
          const record = await pb.collection('disciplines').delete(params.id);
        } catch (err) {
          console.error(err)
          throw error(err.status, err.message)
        }
        throw redirect(303, '/')

      }
      else {
        throw redirect(303, '/login')
      }

  },
} satisfies Actions;