import type { Generated } from 'kysely';

export interface Database {
    users: usersTable
    nutrition_items: nutritionItems
}


export interface usersTable {
    id: Generated<number>
    email: string
    first_name: string
    last_name: string
    password_hash: string
}

export interface nutritionItems {
    id: Generated<number>
    title: string
    amount: string | null
    time: Date
    calories: number
    protein: number
}