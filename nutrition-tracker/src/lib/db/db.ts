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


// export default async function createAndSeedDB(){
//     const createResult = await pool.query(`
//         CREATE TABLE IF NOT EXISTS first_table (
//             id SERIAL PRIMARY KEY,
//             username VARCHAR(100)
//         )
//     `)
    
//     const insertResult = await pool.query(`
//         INSERT INTO first_table (username)
//         VALUES ('brandb123')
//     `)

//     return {createResult, insertResult};
// }

