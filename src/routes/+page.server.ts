import { pb } from '$lib/pocketbase'
import type { PageServerLoad, Actions } from './$types';
import { onMount } from 'svelte'
import { fail, redirect, error } from "@sveltejs/kit"



export const actions = {
  addDiscipline: async ({ request, locals, params }) => {

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
          const record = await pb.collection('disciplines').create(data);
      } catch (err) {
          console.error(err)
          throw error(err.status, err.message)
      }

      return { success: true };
  },
} satisfies Actions;

export const load = (async () => {
  const disciplines = await pb.collection('disciplines').getFullList({
    sort: 'name'
    //expand: 'ressources(disciplines)'
  });
  const themes = await pb.collection('themes').getFullList({
    sort: 'name'
    //expand: 'ressources(disciplines)'
  });
  const groups = await pb.collection('ressource_groups').getFullList({
    sort: 'order'
  });
  const ressources = await pb.collection('ressources').getFullList({
    sort: 'name',
    expand: 'disciplines, themes, ressourcegroup, ressourcetype'
    //expand: 'ressources(disciplines)'
  });

  return {
    disciplinesobj: JSON.parse(JSON.stringify(disciplines)),
    themesobj: JSON.parse(JSON.stringify(themes)),
    groupsobj: JSON.parse(JSON.stringify(groups)),
    ressourcesobj: JSON.parse(JSON.stringify(ressources)),
  };
}) satisfies PageServerLoad;

