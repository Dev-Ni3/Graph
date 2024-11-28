import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
  schema: './src/db/*.ts', // Ensure this matches your schema file location
  out: './src/db/migrations', // Path for migration files
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL, // Environment variable for database URL
  },
  introspect: {
    casing: 'preserve', // Keeps original casing from the database schema
  },
  // Uncomment if you want to restrict to specific schemas
  // schemaFilter: ['public'],
} satisfies Config;
