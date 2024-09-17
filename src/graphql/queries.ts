import { graphql } from 'gql.tada'

export const GetAllRisksQuery = graphql(
    `
        query AllRisks (
            $descriptionFilter: String
            $includeResolved: Boolean
            $limit: Int
            $nameFilter: String
            $offset: Int
        ) {
            risks (
                descriptionFilter: $descriptionFilter
                includeResolved: $includeResolved
                limit: $limit
                nameFilter: $nameFilter
                offset: $offset
            ) {
                count
                filtered {
                    _id
                    name
                    description
                    category {
                        name
                    }
                    resolved
                    createdBy
                }
            }
        }
    `
)

export const GetAllCategoriesQuery = graphql(
    `
        query AllCategories (
            $offset: Int
            $limit: Int
            $nameFilter: String
            $descriptionFilter: String
        )
        {
            categories (
                offset: $offset
                limit: $limit
                nameFilter: $nameFilter
                descriptionFilter: $descriptionFilter
            ) {
                count
                filtered {
                    _id
                    name
                    description
                    createdBy
                }
            }
        }
    `
)