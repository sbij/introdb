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
	disciplinesToParentDiscip
} from '$lib/server/schema';
import { eq } from 'drizzle-orm';

export async function load() {
	const branchsobj = await db.select().from(branchsOfScience);
	// TODO: ajouter sort order


	const disciplinesobj = await db
		.select()
		.from(disciplines)
		.leftJoin(disciplinesToBranchs, eq(disciplines.id, disciplinesToBranchs.disciplineId))
		.leftJoin(disciplinesToParentDiscip, eq(disciplines.id, disciplinesToParentDiscip.disciplineId));




	/* 	.leftJoin(disciplinesToBranchs, eq(branchsOfScience.id, disciplinesToBranchs.branchId))
	.leftJoin(disciplines, eq(disciplines.id, disciplinesToBranchs.disciplineId)); */

	const themesobj = await db.query.themes.findMany({
		with: {
			themesToDisciplines: {
				with: {
					discipline: true
				}
			}
		}
	});

	return { branchsobj, disciplinesobj, themesobj };
}
