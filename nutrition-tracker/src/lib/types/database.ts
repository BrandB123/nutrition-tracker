import type { Insertable, Generated, Selectable } from 'kysely';

export interface Database {
    users: UserTable
    nutrition_items: nutritionItemsTable
    common_items: commonItemsTable
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

export interface commonItemsTable {
    id: Generated<number>
    title: string
    unit: string
    calories_per_unit: number
    protein_per_unit: number
    user_id: number
}

export type CommonItem = Insertable<commonItemsTable>