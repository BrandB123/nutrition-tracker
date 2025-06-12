import type { Generated } from 'kysely';

export interface Database {
    first_table: firstTable
    nutrition_items: nutritionItems
}


export interface firstTable {
    id: number
    username: string
}

export interface nutritionItems {
    id: Generated<number>
    title: string
    amount: string | null
    time: Date
    calories: number
    protein: number
}