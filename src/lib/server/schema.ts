import {
	integer,
	pgEnum,
	pgTable,
	serial,
	text,
	uniqueIndex,
	varchar,
	primaryKey
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const usersTable = pgTable('users', {
	id: serial('id').primaryKey(),
	fullName: text('full_name'),
	phone: varchar('phone', { length: 256 })
});

export const branchsOfScience = pgTable('branchsofscience', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 256 }).unique().notNull(),
	order: integer('order')
});

export const branchsRelations = relations(branchsOfScience, ({ many }) => ({
	disciplinesToBranchs: many(disciplinesToBranchs)
}));

export const disciplines = pgTable('disciplines', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 256 }).unique().notNull(),
	description: varchar('description', { length: 256 })
});

export const disciplinesRelations = relations(disciplines, ({ many }) => ({
	disciplinesToBranchs: many(disciplinesToBranchs),
	themesToDisciplines: many(themesToDisciplines)
}));

export const disciplinesToParentDiscip = pgTable(
	'disciplines_to_parent_discip',
	{
		disciplineId: integer('discipline_id')
			.notNull()
			.references(() => disciplines.id),
		parentId: integer('parent_id')
			.notNull()
			.references(() => disciplines.id)
	},
	(t) => ({
		pk: primaryKey({ columns: [t.disciplineId, t.parentId] })
	})
);

export const disciplinesToBranchs = pgTable(
	'disciplines_to_branchs',
	{
		disciplineId: integer('discipline_id')
			.notNull()
			.references(() => disciplines.id),
		branchId: integer('branch_id')
			.notNull()
			.references(() => branchsOfScience.id)
	},
	(t) => ({
		pk: primaryKey({ columns: [t.disciplineId, t.branchId] })
	})
);

export const disciplinesToBranchsRelations = relations(disciplinesToBranchs, ({ one }) => ({
	branch: one(branchsOfScience, {
		fields: [disciplinesToBranchs.branchId],
		references: [branchsOfScience.id]
	}),
	discipline: one(disciplines, {
		fields: [disciplinesToBranchs.disciplineId],
		references: [disciplines.id]
	})
}));

export const themes = pgTable('themes', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 256 }).unique().notNull()
});

export const themesRelations = relations(themes, ({ many }) => ({
	themesToDisciplines: many(themesToDisciplines)
}));

export const themesToDisciplines = pgTable(
	'themes_to_disciplines',
	{
		themeId: integer('theme_id')
			.notNull()
			.references(() => themes.id),
		disciplineId: integer('discipline_id')
			.notNull()
			.references(() => disciplines.id)
	},
	(t) => ({
		pk: primaryKey({ columns: [t.themeId, t.disciplineId] })
	})
);

export const themesToDisciplinesRelations = relations(themesToDisciplines, ({ one }) => ({
	theme: one(themes, {
		fields: [themesToDisciplines.themeId],
		references: [themes.id]
	}),
	discipline: one(disciplines, {
		fields: [themesToDisciplines.disciplineId],
		references: [disciplines.id]
	})
}));

export const ressources = pgTable('ressources', {
	id: serial('id').primaryKey(),
	content: text('content').unique().notNull(),
	url: varchar('url', { length: 256 }).unique(),
	description: text('description')
});

export const ressourcesToDisciplines = pgTable(
	'ressources_to_disciplines',
	{
		ressourceId: integer('ressource_id')
			.notNull()
			.references(() => ressources.id),
		disciplineId: integer('discipline_id')
			.notNull()
			.references(() => disciplines.id)
	},
	(t) => ({
		pk: primaryKey({ columns: [t.ressourceId, t.disciplineId] })
	})
);
