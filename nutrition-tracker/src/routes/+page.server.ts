import type { PageServerLoad } from './$types.js'
import type { NutritionItem } from './$types.js';
import { db } from '$lib/db'

async function getNutritionItems(){
    const items = await db
    .selectFrom('nutrition_items')
    .selectAll()
    .execute()  
    return items;
}


export const load: PageServerLoad =  async () => {
    try {
        const items = await getNutritionItems();
        return { items };
    } catch (error) {
        const items: NutritionItem[] = [];
        console.error(error);
        return { items };
    }
}