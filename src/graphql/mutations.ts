import { graphql } from 'gql.tada'

export const CreateRiskMutation = graphql(
    `
        mutation CreateRisk($name: String!, $description: String!, $categoryId: ID!) {
            createRisk(name: $name, description: $description, categoryId: $categoryId) {
                _id
                name
                description
                resolved
                category {
                    _id
                    name
                }
                createdBy
            }
        }
    `
)

export const CreateCategoryMutation = graphql(
    `
        mutation CreateCategory($name: String!, $description: String!) {
            createCategory(name: $name, description: $description) {
                _id
                name
                description
                createdBy
            }
        }
    `
)


export const UpdateRisk = graphql(
    `
        mutation UpdateRisk($_id: ID!, $name: String, $description: String, $categoryId: ID) {
            updateRisk(_id: $_id, name: $name, description: $description, categoryId: $categoryId) {
                _id
                name
                description
                resolved
                category {
                    _id
                    name
                }
                createdBy
            }
        }
    `
)


export const UpdateCategory = graphql(
    `
        mutation UpdateCategory($_id: ID!, $name: String, $description: String) {
            updateCategory(_id: $_id, name: $name, description: $description) {
                _id
                name
                description
                createdBy
            }
        }
    `
)

export const RemoveRisk = graphql(
    `
        mutation RemoveRisk($_id: ID!) {
            removeRisk(_id: $_id) {
                _id
                name
                description
                resolved
                category {
                    _id
                    name
                }
                createdBy
            }
        }
    `
)

export const RemoveCategory = graphql(
    `
        mutation RemoveCategory($_id: ID!) {
            removeCategory(_id: $_id) {
                _id
                name
                description
                createdBy
            }
        }
    `
)


export const ChangeRiskStatus = graphql(
    `
        mutation changeRiskStatus($_id: ID!, $resolved: Boolean!) {
            changeRiskStatus(_id: $_id, resolved: $resolved) {
                _id
                name
                description
                resolved
                category {
                    _id
                    name
                }
                createdBy
            }
        }
    `
)