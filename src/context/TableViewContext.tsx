import { Category, Risk } from '@models/API'
import APIService from '@services/APIService'
import { createContext, ReactNode, useCallback, useContext, useState } from 'react'

interface TableViewContextType {
    risks: Array<Risk>
    categories: Array<Category>

    nameFilter: string | null
    descriptionFilter: string | null

    table: 'risks' | 'categories'
    onlyUnresolved: boolean
    maxRows: number

    changeFilter(type: 'name' | 'description', filter: string): void

    resetFilter: (type: 'name' | 'description') => void

    changeTable: (table: 'risks' | 'categories') => void
    changeOnlyUnresolved: (onlyResolver: boolean) => void
    changeMaxRows: (maxRows: number) => void

    fetchRisks: () => Promise<void>
    fetchCategories: () => Promise<void>
}

const TableViewContext = createContext<TableViewContextType | undefined>(undefined)

export const TableViewContextProvider = ({ children }: { children: ReactNode }) => {
    const [risks, setRisks] = useState<Array<Risk>>([])
    const [categories, setCategories] = useState<Array<Category>>([])

    const [nameFilter, setNameFilter] = useState<string | null>(null)
    const [descriptionFilter, setDescriptionFilter] = useState<string | null>(null)
    const [maxRows, setMaxRows] = useState<number>(10)

    const [table, setTable] = useState<'risks' | 'categories'>('risks')
    const [onlyUnresolved, setOnlyUnresolved] = useState<boolean>(false)

    const changeFilter = useCallback(
        (type: 'name' | 'description', filter: string) => {
            if (type === 'name') setNameFilter(filter)
            if (type === 'description') setDescriptionFilter(filter)
        },
        [setNameFilter, setDescriptionFilter]
    )

    const resetFilter = useCallback(
        (type: 'name' | 'description') => {
            if (type === 'name') setNameFilter(null)
            if (type === 'description') setDescriptionFilter(null)
        },
        [setNameFilter, setDescriptionFilter]
    )

    const changeTable = useCallback(
        (table: 'risks' | 'categories') => {
            if (table === 'risks' || table === 'categories') setTable(table)
        },
        [setTable]
    )

    const changeOnlyUnresolved = useCallback(
        (onlyResolved: boolean) => {
            setOnlyUnresolved(onlyResolved)
        },
        [setOnlyUnresolved]
    )

    const changeMaxRows = useCallback(
        (maxRows: number) => {
            setMaxRows(maxRows)
        },
        [setMaxRows]
    )

    const fetchRisks = useCallback(async () => {
        const response = await APIService.getRows('risks', 0, 10, nameFilter, descriptionFilter, onlyUnresolved)
        if (response.success) {
            setRisks(response.data.rows as Array<Risk>)
        } else {
            console.log('Failed to fetch data', response.error)
        }
    }, [nameFilter, descriptionFilter, onlyUnresolved])

    const fetchCategories = useCallback(async () => {
        const response = await APIService.getRows('categories', 0, 10, nameFilter, descriptionFilter, onlyUnresolved)
        if (response.success) {
            setCategories(response.data.rows as Array<Category>)
        } else {
            console.log('Failed to fetch data', response.error)
        }
    }, [nameFilter, descriptionFilter, onlyUnresolved])

    return (
        <TableViewContext.Provider
            value={{
                risks,
                categories,

                nameFilter,
                descriptionFilter,
                table,
                onlyUnresolved,
                maxRows,

                changeFilter,
                resetFilter,
                changeTable,
                changeOnlyUnresolved,
                changeMaxRows,

                fetchRisks,
                fetchCategories,
            }}
        >
            {children}
        </TableViewContext.Provider>
    )
}

export const useTableViewContext = () => {
    const context = useContext(TableViewContext)
    if (context === undefined) {
        throw new Error('useTableViewContext must be used within a TableViewContextProvider.')
    }
    return context as TableViewContextType
}
