import { pb } from '$lib/pocketbase'
import type { PageServerLoad, Actions } from './$types';
import { onMount } from 'svelte'
import { fail, redirect, error } from "@sveltejs/kit"


export const load = (async () => {
  const records = await pb.collection('subjects').getFullList({
    sort: 'name',
  });

  return {
    recordsobj: JSON.parse(JSON.stringify(records)),
  };
}) satisfies PageServerLoad;

