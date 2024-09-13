import { createContext, ReactNode, useCallback, useContext, useState } from 'react'

interface TableViewContextType {
    nameFilter: string | null
    descriptionFilter: string | null
    table: 'risks' | 'categories'
    onlyUnresolved: boolean

    changeFilter(type: 'name' | 'description', filter: string): void
    resetFilter: (type: 'name' | 'description') => void

    changeOnlyUnresolved: (onlyResolver: boolean) => void
    changeTable: (table: 'risks' | 'categories') => void
}

const TableViewContext = createContext<TableViewContextType | undefined>(undefined)

export const TableViewContextProvider = ({ children }: { children: ReactNode }) => {
    const [nameFilter, setNameFilter] = useState<string | null>(null)
    const [descriptionFilter, setDescriptionFilter] = useState<string | null>(null)

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

    return (
        <TableViewContext.Provider
            value={{
                nameFilter,
                descriptionFilter,
                onlyUnresolved,
                table,
                changeFilter,
                resetFilter,
                changeTable,
                changeOnlyUnresolved,
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
