import { db } from '$lib/db';
import 'dotenv/config';
import { fail, redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import type { NutritionItem } from '$lib/types';
import type { PageServerLoad, Actions } from './$types';
import type { JwtPayload, PrivateKey } from 'jsonwebtoken';

async function getFirstNutritionItem(userId: number){
    const item = await db
    .selectFrom('nutrition_items')
    .selectAll()
    .where('user_id', '=', userId)
    .orderBy('time', 'asc')
    .executeTakeFirst()
    return item;
}

async function getNutritionItems(userId: number){
    const items = await db
    .selectFrom('nutrition_items')
    .selectAll()
    .where('user_id', '=', userId)
    .orderBy('time', 'asc')
    .execute()  
    return items;
}

async function resetNutritionItems(userId: number, startOfDay: Date){
    await db
        .deleteFrom('nutrition_items')
        .where('user_id', '=', userId)
        .where('time', '<', startOfDay)
        .executeTakeFirstOrThrow()
}

function setTimestamp(time: string){
    const pm = time.includes('PM');
    const timeArray = time.replace(' ', ':').split(":");
    // handle 12 am hour
    if (Number(timeArray[0]) === 12 && !pm) {timeArray[0] = (Number(timeArray[0]) - 12).toString()}
    // handle pm hours
    if (Number(timeArray[0]) !== 12 && pm) {timeArray[0] = (Number(timeArray[0]) + 12).toString()}
    const timestamp = new Date();
    timestamp.setHours(Number(timeArray[0]), Number(timeArray[1]));
    return timestamp;
}

export const actions = {
    addNutritionItem: async ( { request, cookies } ) => {
        const data = await request.formData();
        const title = data.get('title');
        const amount = data.get('amount');
        const time = data.get('time');
        const calories = data.get('calories');
        const protein = data.get('protein');
        const commonItem = data.get('common-item');
        const unit = data.get('unit');
        const caloriesPerUnit = data.get('calories-per-unit');
        const proteinPerUnit = data.get('protein-per-unit');
        let id;

        const submittedData = { title, amount, time, calories, protein, unit, caloriesPerUnit, proteinPerUnit}

        const token = cookies.get('token');

        if (!token){
            throw redirect(303, '/login');
        } 

        if (!process.env.PRIVATE_JWT_KEY){
            console.error('env var not found')
            return fail(500, {submittedData, message: "An Unexpected Error Occurred. Please try again later."})
        }

        const privateKey: PrivateKey = process.env.PRIVATE_JWT_KEY;

        try {
            const { user } = jwt.verify(token, privateKey) as JwtPayload
            id = user.id
        } catch(error){
            cookies.set('token', '', {path: '/'});
            console.error(error);
            throw redirect(303, '/login');
        }

        if (!title){
            return fail(422, {submittedData, message: "Missing Data: 'Title' is a required field." })
        }

        if (!time){
            return fail(422, {submittedData, message: "Missing Data: 'Time' is a required field." })
        }else if (!time.toString().match(/^.?\d:[0-5][0-9] (am|pm|AM|PM)$/)) {
            return fail(422, {title, amount, calories, protein, message: "Invalid Data: 'Time' must match format of HH:MM AM/PM" })
        }

        if (!calories){
            return fail(422, {submittedData, message: "Missing Data: 'Calories' is a required field." })
        }

        if (!protein){
            return fail(422, {submittedData, message: "Missing Data: 'Protein' is a required field." })
        }

        if (!!commonItem && !unit){
            return fail(422, {submittedData, message: "Missing Data: Complete all fields of Common Item Form." })
        }

        try {
            await db
                .insertInto('nutrition_items')
                .values({
                    title: title.toString(),
                    amount: amount?.toString(),
                    time: setTimestamp(time.toString()),
                    calories: Number(calories),
                    protein: Number(protein),
                    user_id: id
                })
                .executeTakeFirstOrThrow()

        } catch (error) {
            console.error(error)
            return fail(500, {submittedData, message: "An Unexpected Error Occurred" })
        }

        if (!!commonItem && !!unit && !!caloriesPerUnit && !!proteinPerUnit){
            try {
                await db
                    .insertInto('common_items')
                    .values({
                        title: title.toString(),
                        unit: unit.toString(),
                        calories_per_unit: Number(caloriesPerUnit),
                        protein_per_unit: Number(proteinPerUnit),
                        user_id: id

                    })
                    .executeTakeFirstOrThrow()

            } catch (error) {
                console.error(error)
                return fail(500, {submittedData, message: "An Unexpected Error Occurred" })
            }
        }

        return { success: true };
    },

    deleteNutritionItem: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');

        if (!id || typeof id !== 'string' || isNaN(Number(id))){
            return fail(400, {message: "invalid submission. Please try again"});
        }
        try {
            await db
                .deleteFrom('nutrition_items')
                .where('id', '=', Number(id))
                .executeTakeFirstOrThrow()
        } catch (error) {
            console.log(error)
            return fail(500, {message: "Error Deleting Item. Please try again"}); 
        }
    }
} satisfies Actions


export const load: PageServerLoad =  async ( { cookies, url } ) => {
    if (!process.env.PRIVATE_JWT_KEY){
        console.error('env var not found')
        return fail(500, {message: "An Unexpected Error Occurred while loading. Please try again later."})
    }

    const token = cookies.get('token');
    const privateKey: PrivateKey = process.env.PRIVATE_JWT_KEY;
    let id;
    let items: NutritionItem[];

    if (!token){
        throw redirect(303, '/login');
    }
    
    try {
        const { user } = jwt.verify(token, privateKey) as JwtPayload
        id = user.id
    } catch(error){
        cookies.set('token', '', {path: '/'});
        console.error(error);
        throw redirect(303, '/login');
    }
    
    let showForm = url.search.includes('addNutritionItem') ? true : false

    try {
        const res = await getFirstNutritionItem(id);
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        if (res && res.time < startOfDay){
            resetNutritionItems(id, startOfDay);
        }
    } catch(error) {
        // add a redirect to an error page here so they can try to load the page again
        items = [];
        console.error(error);
        return { items, showForm };
    }

    try {
        items = await getNutritionItems(id);
        return { items, showForm};
    } catch (error) {
        // add a redirect to an error page here so they can try to load the page again
        items = [];
        console.error(error);
        return { items, showForm };
    }
}