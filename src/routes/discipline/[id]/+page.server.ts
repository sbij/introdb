import type { PageServerLoad, Actions } from './$types';
import { onMount } from 'svelte';
import { fail, redirect, error } from '@sveltejs/kit';

import { db } from '$lib/server/db';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import {
	branchsOfScience,
	disciplinesToBranchs,
	disciplines,
	themesToDisciplines,
	disciplinesToParentDiscip,
	ressources,
	ressourcesToDisciplines
} from '$lib/server/schema';
import { eq } from 'drizzle-orm';

export const load = (async ({ params }) => {

	const disciplineobj = await db.select().from(disciplines).where(eq(disciplines.id, parseInt(params.id)));

	const disciplinesparentobj = await db.select().from(disciplines).leftJoin(disciplinesToParentDiscip, eq(disciplinesToParentDiscip.parentId, disciplines.id)).where(eq(disciplinesToParentDiscip.disciplineId, parseInt(params.id))).orderBy(disciplines.name);

	const disciplinesenfantobj = await db.select().from(disciplines).leftJoin(disciplinesToParentDiscip, eq(disciplinesToParentDiscip.disciplineId, disciplines.id)).where(eq(disciplinesToParentDiscip.parentId, parseInt(params.id))).orderBy(disciplines.name);

	const ressourcesobj = await db.select().from(ressources).leftJoin(ressourcesToDisciplines, eq(ressources.id, ressourcesToDisciplines.ressourceId)).where(eq(ressourcesToDisciplines.disciplineId, parseInt(params.id)));


	return {
		disciplineobj, ressourcesobj, disciplinesparentobj, disciplinesenfantobj
	};
}) satisfies PageServerLoad;
