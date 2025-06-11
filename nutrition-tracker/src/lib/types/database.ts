export interface Database {
    first_table: firstTable
    nutrition_items: nutritionItems
}


export interface firstTable {
    id: number
    username: string
}

export interface nutritionItems {
    id: number
    title: string
    amount: string | null
    time: string
    calories: number
    protein: number
}