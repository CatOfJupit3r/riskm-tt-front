import { useMutation } from '@apollo/client'
import {
    ChangeRiskStatus,
    CreateCategoryMutation,
    CreateRiskMutation,
    RemoveCategory,
    RemoveRisk,
    UpdateCategory,
    UpdateRisk,
} from '@graphql/mutations'
import APIService from '@services/APIService'
import { GetAllCategoriesQuery, GetAllRisksQuery } from '@graphql/queries'

const useCreateRiskMutation = () =>
    useMutation(CreateRiskMutation, {
        context: {
            headers: APIService.getHeaders(),
        },
        update: () => {
            APIService.client.refetchQueries({
                include: [GetAllRisksQuery],
            })
        },
    })

const useCreateCategoryMutation = () =>
    useMutation(CreateCategoryMutation, {
        context: {
            headers: APIService.getHeaders(),
        },
        update: () => {
            APIService.client.refetchQueries({
                include: [GetAllCategoriesQuery],
            })
        },
    })

const useUpdateRiskMutation = () =>
    useMutation(UpdateRisk, {
        context: {
            headers: APIService.getHeaders(),
        },
        update: () => {
            APIService.client.refetchQueries({
                include: [GetAllRisksQuery],
            })
        },
    })

const useUpdateCategoryMutation = () =>
    useMutation(UpdateCategory, {
        context: {
            headers: APIService.getHeaders(),
        },
        update: () => {
            APIService.client.refetchQueries({
                include: [GetAllCategoriesQuery],
            })
        },
    })

const useRemoveRiskMutation = () =>
    useMutation(RemoveRisk, {
        context: {
            headers: APIService.getHeaders(),
        },
        update: () => {
            APIService.client.refetchQueries({
                include: [GetAllRisksQuery],
            })
        },
    })

const useRemoveCategoryMutation = () =>
    useMutation(RemoveCategory, {
        context: {
            headers: APIService.getHeaders(),
        },
        update: () => {
            APIService.client.refetchQueries({
                include: [GetAllCategoriesQuery],
            })
        },
    })

export const useChangeRiskStatusMutation = () =>
    useMutation(ChangeRiskStatus, {
        context: {
            headers: APIService.getHeaders(),
        },
        update: () => {
            APIService.client.refetchQueries({
                include: [GetAllRisksQuery],
            })
        },
    })

export {
    useCreateCategoryMutation,
    useCreateRiskMutation,
    useRemoveCategoryMutation,
    useRemoveRiskMutation,
    useUpdateCategoryMutation,
    useUpdateRiskMutation,
}
