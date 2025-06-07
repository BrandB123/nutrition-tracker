import type { PageServerLoad } from './$types.js'
import type { NutritionItem } from '$lib/types/nutritionItem.js';

export const load: PageServerLoad =  () => {
    const items: NutritionItem[]  = [
        {
            title: "yogurt",
            amount: "2 servings",
            time: '8:00am',
            calories: 180,
            protein: 10
        },
        {
            title: "breakfast burrito",
            amount: "",
            time: '8:00am',
            calories: 500,
            protein: 20
        },
        {
            title: "yogurt",
            amount: "1 serving",
            time: '8:00am',
            calories: 140,
            protein: 6
        },
        {
            title: "milk",
            amount: "36 oz",
            time: '8:00am',
            calories: 675,
            protein: 36
        },
    ]

    return { items };
}