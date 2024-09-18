import { useQuery } from '@apollo/client'
import { AddCategoryInTable, AddRiskInTable } from '@components/AddNewData'
import {
    CategoryRowInTable,
    PseudoCategoryRowInTable,
    PseudoRiskRowInTable,
    RiskRowInTable,
} from '@components/DataDisplays'
import Duplicate from '@components/Duplicate'
import PaginationInTable from '@components/PaginationInTable'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@components/ui/table'
import { useFiltersContext } from '@context/FiltersContext'
import { GetAllCategoriesQuery, GetAllRisksQuery } from '@graphql/queries'
import { Category, Risk } from '@models/API'
import { useCallback, useEffect, useRef, useState } from 'react'

const RiskAndCategoriesView = () => {
    const { filters } = useFiltersContext()
    const { table, maxRows, includeResolved, name: nameFilter, description: descriptionFilter } = filters
    const [page, setPage] = useState(1)
    const [columnWidths, setColumnWidths] = useState<Array<number>>([])
    const tableRef = useRef<HTMLTableElement>(null)
    const externalHeaderRef = useRef<HTMLDivElement>(null)

    const {
        data: risksData,
        loading: risksLoading,
        error: risksError,
    } = useQuery(GetAllRisksQuery, {
        variables: {
            offset: (page - 1) * maxRows,
            limit: maxRows,
            nameFilter,
            descriptionFilter,
            includeResolved,
        },
        skip: table === 'categories',
    })
    const {
        data: categoriesData,
        loading: categoriesLoading,
        error: categoriesError,
    } = useQuery(GetAllCategoriesQuery, {
        variables: {
            offset: (page - 1) * maxRows,
            limit: maxRows,
            nameFilter,
            descriptionFilter,
        },
        skip: table === 'risks',
    })

    useEffect(() => {
        if (risksError) {
            if (risksError.message === 'Unauthorized') {
                localStorage.removeItem('token')
                window.location.reload()
            }
        }
        if (categoriesError) {
            console.error(categoriesError)
        }
    }, [risksError, categoriesError])

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            if (table === 'categories' && categoriesLoading) {
                return
            }
            if (table === 'risks' && risksLoading) {
                return
            }
            if (tableRef.current) {
                const headerCells = tableRef.current.querySelectorAll('th')
                const widths = Array.from(headerCells).map((cell) => cell.offsetWidth)
                setColumnWidths(widths)
            }
        })
        if (tableRef.current) {
            observer.observe(tableRef.current)
        }
        return () => {
            tableRef.current && observer.unobserve(tableRef.current)
        }
    }, [tableRef, filters.table, risksLoading, categoriesLoading, table])

    const syncScrollFromCurrent = useCallback(() => {
        if (
            tableRef.current &&
            externalHeaderRef.current &&
            externalHeaderRef.current.scrollLeft !== tableRef.current.scrollLeft
        ) {
            externalHeaderRef.current.scrollLeft = tableRef.current.scrollLeft
        }
    }, [tableRef, externalHeaderRef])

    const syncScrollFromFake = useCallback(() => {
        if (
            tableRef.current &&
            externalHeaderRef.current &&
            tableRef.current.scrollLeft !== externalHeaderRef.current.scrollLeft
        ) {
            tableRef.current.scrollLeft = externalHeaderRef.current.scrollLeft
        }
    }, [tableRef, externalHeaderRef])

    useEffect(() => {
        const tableElement = tableRef.current
        const headerElement = externalHeaderRef.current

        if (tableElement && headerElement) {
            tableElement.addEventListener('scroll', syncScrollFromCurrent)
            headerElement.addEventListener('scroll', syncScrollFromFake)
        }

        return () => {
            if (tableElement && headerElement) {
                tableElement.removeEventListener('scroll', syncScrollFromCurrent)
                headerElement.removeEventListener('scroll', syncScrollFromFake)
            }
        }
    }, [syncScrollFromCurrent, syncScrollFromFake, tableRef, externalHeaderRef])

    return (
        <div className={'mb-12 p-2'}>
            <div className={'flex flex-row gap-2'}>
                <AddRiskInTable />
                <AddCategoryInTable />
            </div>
            <PaginationInTable
                page={page}
                setPage={setPage}
                total={
                    table === 'categories'
                        ? categoriesLoading
                            ? null
                            : (categoriesData?.categories.count ?? 0)
                        : risksLoading
                          ? null
                          : (risksData?.risks.count ?? 1)
                }
            />
            <div className="sticky top-0 z-10 border-b bg-background">
                <div
                    className="flex w-full overflow-auto transition-colors hover:bg-muted/50"
                    ref={externalHeaderRef}
                    style={{
                        width: `{${columnWidths.reduce((acc, curr) => acc + curr, 0)}px}`,
                    }}
                >
                    {columnWidths.map((width, index) => (
                        <div
                            key={index}
                            className="flex shrink-0 items-center px-4 py-3 text-sm font-medium"
                            style={{ width: `${width - 1}px` }} // without `-1` there would be overflow
                        >
                            {
                                (table === 'categories'
                                    ? ['Name', 'Description', 'Created by', 'Actions']
                                    : ['Name', 'Description', 'Status', 'Category', 'Created by', '...'])[index]
                            }
                        </div>
                    ))}
                </div>
            </div>
            <Table divRef={tableRef}>
                <TableHeader className="pointer-events-none invisible">
                    {table === 'categories' ? (
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Created by</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    ) : (
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Created by</TableHead>
                            <TableHead>...</TableHead>
                        </TableRow>
                    )}
                </TableHeader>
                <TableBody>
                    {table === 'categories' ? (
                        <>
                            {categoriesLoading ? (
                                <Duplicate times={page === 1 ? 10 : maxRows}>
                                    <PseudoCategoryRowInTable key={0} pulsating />
                                </Duplicate>
                            ) : categoriesError ? (
                                <Duplicate times={page === 1 ? 10 : maxRows}>
                                    <PseudoCategoryRowInTable key={0} />
                                </Duplicate>
                            ) : (
                                categoriesData?.categories.filtered.map((input, index) => (
                                    <CategoryRowInTable key={index} input={input as Category} />
                                ))
                            )}
                        </>
                    ) : (
                        <>
                            {risksLoading ? (
                                <Duplicate times={maxRows}>
                                    <PseudoRiskRowInTable key={0} pulsating />
                                </Duplicate>
                            ) : risksError ? (
                                <Duplicate times={page === 1 ? 10 : maxRows}>
                                    <PseudoRiskRowInTable key={0} />
                                </Duplicate>
                            ) : (
                                risksData?.risks.filtered.map((input, index) => (
                                    <RiskRowInTable key={index} input={input as Risk} />
                                ))
                            )}
                        </>
                    )}
                </TableBody>
            </Table>
            <PaginationInTable
                page={page}
                setPage={setPage}
                total={
                    table === 'categories'
                        ? categoriesLoading
                            ? null
                            : (categoriesData?.categories.count ?? 0)
                        : risksLoading
                          ? null
                          : (risksData?.risks.count ?? 1)
                }
            />
        </div>
    )
}

export default RiskAndCategoriesView
