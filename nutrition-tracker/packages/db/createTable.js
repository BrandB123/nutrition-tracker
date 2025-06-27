import 'dotenv/config'
import { Client } from 'pg';

if (!process.argv[2]){
    console.error("ERROR: Missing command line argument. Provide name of new table")
    process.exit(1);
}

async function createTable(){
    try {
        const client = new Client();
        await client.connect();
        console.log('connected to database');
        await client.query(`
            CREATE TABLE IF NOT EXISTS ${process.argv[2]} (
                id SERIAL PRIMARY KEY,
                title VARCHAR(100) UNIQUE NOT NULL,
                unit VARCHAR(20) NOT NULL,
                calories_per_unit INTEGER NOT NULL,
                protein_per_unit INTEGER NOT NULL,
                user_id INTEGER REFERENCES users (id)
            )
        `)
        await client.end();
        console.log('disconneted from database');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
    console.log('Database updated successfully')
}

createTable();

