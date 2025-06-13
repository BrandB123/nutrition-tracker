import type { PageServerLoad, Actions } from './$types'
import type { NutritionItem } from '$lib/types';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/db'

async function getNutritionItems(){
    const items = await db
    .selectFrom('nutrition_items')
    .selectAll()
    .orderBy('time', 'asc')
    .execute()  
    return items;
}

function setTimestamp(time: string){
    const pm = time.includes('PM');
    const timeArray = time.replace(' ', ':').split(":");
    if (pm) {timeArray[0] = (Number(timeArray[0]) + 12).toString()}
    const timestamp = new Date();
    timestamp.setHours(Number(timeArray[0]), Number(timeArray[1]));
    return timestamp;
}

export const actions = {
    addNutritionItem: async ( { request } ) => {
        const data = await request.formData();
        const title = data.get('title');
        const amount = data.get('amount');
        const time = data.get('time');
        const calories = data.get('calories');
        const protein = data.get('protein');

        if (!title){
            return fail(422, {title, time, amount, calories, protein, message: "Missing Data: 'Title' is a required field." })
        }

        if (!time){
            return fail(422, {title, time, amount, calories, protein, message: "Missing Data: 'Time' is a required field." })
        }else if (!time.toString().match(/^.?\d:[0-5][0-9] (am|pm|AM|PM)$/)) {
            return fail(422, {title, amount, calories, protein, message: "Invalid Data: 'Time' must match format of HH:MM AM/PM" })
        }

        if (!calories){
            return fail(422, {title, time, amount, calories, protein, message: "Missing Data: 'Calories' is a required field." })
        }
        if (!protein){
            return fail(422, {title, time, amount, calories, protein, message: "Missing Data: 'Protein' is a required field." })
        }

        try {
            const result = await db
                .insertInto('nutrition_items')
                .values({
                    title: title.toString(),
                    amount: amount?.toString(),
                    time: setTimestamp(time.toString()),
                    calories: Number(calories),
                    protein: Number(protein)
                })
                .executeTakeFirstOrThrow()

            return { success: true };
        } catch (error) {
            console.error(error)
            return fail(500, {title, time, amount, calories, protein, message: "An Unexpected Error Occurred" })
        }
    }
} satisfies Actions


export const load: PageServerLoad =  async ( { cookies, url } ) => {
    if (!cookies.get('token')){
        throw redirect(303, '/login');
    }
    
    let showForm = url.search ? true : false
    try {
        const items = await getNutritionItems();
        return { items, showForm};
    } catch (error) {
        const items: NutritionItem[] = [];
        console.error(error);
        return { items, showForm };
    }
}