import type { Generated, Selectable } from 'kysely';

export interface Database {
    users: UserTable
    nutrition_items: nutritionItemsTable
}

export interface UserTable {
    id: Generated<number>
    email: string
    first_name: string
    last_name: string
    password_hash: string
}

export type User = Selectable<UserTable>

export interface nutritionItemsTable {
    id: Generated<number>
    title: string
    amount: string | null
    time: Date
    calories: number
    protein: number
    user_id: number
}

export type NutritionItem = Selectable<nutritionItemsTable>