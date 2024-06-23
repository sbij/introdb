import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import pkg from 'pg';
const {Client} = pkg;
import { CONNECTION_URL } from '$env/dynamic/private';
import * as schema from '$lib/server/schema';


const client = new Client({
	connectionString: CONNECTION_URL
});

await client.connect();
export const db = drizzle(client, {schema});
