import 'dotenv/config'
import { Client } from 'pg';

async function seedDB(){
    try {
        const client = new Client();
        await client.connect();
        console.log('connected to database');
        const datetime = new Date().toISOString();
        await client.query(`
            INSERT INTO nutrition_items (title, amount, time, calories, protein)
                VALUES 
                ('yogurt', '2 servings', '${datetime}', 180, 10),
                ('breakfast burrito', null, '${datetime}', 500, 20),
                ('yogurt', '1 servings', '${datetime}', 140, 5),
                ('milk', '36 oz', '${datetime}', 675, 36)
        `)
        await client.end();
        console.log('disconneted from database');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
    console.log('Database updated successfully')
}

seedDB();
