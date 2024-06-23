import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();
const { CONNECTION_URL } = process.env;
if (!CONNECTION_URL) {
 throw new Error('No url');
}


export default {
	schema: './src/lib/server/schema.ts',
	out: './drizzle',
	driver: 'pg',
	dbCredentials: {
		connectionString: CONNECTION_URL
	},
	verbose: true,
	strict: true
} satisfies Config;