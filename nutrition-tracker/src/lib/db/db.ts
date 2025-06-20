import 'dotenv/config'
import type { Database } from '$lib/types';
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

const dialect = new PostgresDialect({
    pool: new Pool()
})

export const db = new Kysely<Database>({
    dialect,
})

