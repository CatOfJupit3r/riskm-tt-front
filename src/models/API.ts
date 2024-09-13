export interface Risk {
    _id: string
    name: string
    description: string
    categoryId: string
    resolved: boolean

    createdBy: string
    createdAt: string // date-like
    updatedAt: string // date-like
}

export interface Category {
    _id: string
    name: string
    description: string

    createdBy: string
    createdAt: string // date-like
    updatedAt: string // date-like
}