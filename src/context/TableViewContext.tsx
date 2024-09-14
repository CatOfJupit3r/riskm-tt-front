import { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import { Category, Risk } from '@models/API'

interface TableViewContextType {
    data: Array<Risk | Category>
    totalQuery: number

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
    changeData: (data: Array<Risk | Category>) => void
    changeTotalQuery: (totalQuery: number) => void
}

const TableViewContext = createContext<TableViewContextType | undefined>(undefined)

export const TableViewContextProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<Array<Risk | Category>>([])
    const [totalQuery, setTotalQuery] = useState<number>(0)
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

    const changeData = useCallback(
        (data: Array<Risk | Category>) => {
            setData(data)
        },
        [setData]
    )

    const changeTotalQuery = useCallback(
        (totalQuery: number) => {
            setTotalQuery(totalQuery)
        },
        [setTotalQuery]
    )

    return (
        <TableViewContext.Provider
            value={{
                totalQuery,
                data,
                nameFilter,
                descriptionFilter,
                table,
                onlyUnresolved,
                maxRows,

                changeTotalQuery,

                changeFilter,
                resetFilter,
                changeTable,
                changeOnlyUnresolved,
                changeMaxRows,
                changeData,
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
