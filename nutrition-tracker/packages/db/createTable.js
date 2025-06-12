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
                email VARCHAR(50) NOT NULL,
                first_name VARCHAR(30) NOT NULL,
                last_name VARCHAR(30) NOT NULL,
                password_hash VARCHAR(50) NOT NULL
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

