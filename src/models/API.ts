export interface Risk {
    _id: string
    name: string
    description: string
    category: Category
    resolved: boolean

    createdBy: string
    // createdAt: string // date-like
    // updatedAt: string // date-like
}

export interface RiskInput {
    name: string
    description: string
    categoryId: string | null
}

export interface CategoryInput {
    name: string
    description: string
}

export interface Category {
    _id: string
    name: string
    description: string

    createdBy: string
    // createdAt: string // date-like
    // updatedAt: string // date-like
}
