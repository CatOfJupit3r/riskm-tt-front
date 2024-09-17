import { createContext, ReactNode, useCallback, useContext, useState } from 'react'

interface FiltersContextType {
    filters: {
        name: string | null
        description: string | null
        table: 'risks' | 'categories'
        includeResolved: boolean
        maxRows: number
    }

    changeFilter: (filter: {
        name: string | null
        description: string | null
        table: 'risks' | 'categories'
        includeResolved: boolean
        maxRows: number
    }) => void
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined)

export const FiltersContextProvider = ({ children }: { children: ReactNode }) => {
    const [filters, setFilters] = useState<FiltersContextType['filters']>({
        name: null,
        description: null,
        table: 'risks',
        includeResolved: true,
        maxRows: 10,
    })

    const changeFilter = useCallback((filter: FiltersContextType['filters']) => {
        setFilters(filter)
    }, [])

    return (
        <FiltersContext.Provider
            value={{
                filters,
                changeFilter,
            }}
        >
            {children}
        </FiltersContext.Provider>
    )
}

export const useFiltersContext = () => {
    const context = useContext(FiltersContext)
    if (context === undefined) {
        throw new Error('useFiltersContext must be used within a FiltersContextProvider.')
    }
    return context as FiltersContextType
}
