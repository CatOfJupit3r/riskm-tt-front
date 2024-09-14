import Duplicate from '@components/Duplicate'
import TablePagination from '@components/TablePagination'
import {
    CategoryRowInTable,
    PseudoCategoryRowInTable,
    PseudoRiskRowInTable,
    RiskRowInTable,
} from '@components/TableRowWithData'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@components/ui/table'
import { useTableViewContext } from '@context/TableViewContext'
import { Category, Risk } from '@models/API'
import { useCallback, useEffect, useRef, useState } from 'react'

const TableView = () => {
    const {
        onlyUnresolved,
        table,
        maxRows,
        descriptionFilter,
        nameFilter,
        risks,
        categories,
        fetchCategories,
        fetchRisks,
    } = useTableViewContext()
    const [page, setPage] = useState(1)
    const [columnWidths, setColumnWidths] = useState<Array<number>>([])
    const tableRef = useRef<HTMLTableElement>(null)
    const externalHeaderRef = useRef<HTMLDivElement>(null)
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        const observer = new ResizeObserver(() => {
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
    }, [tableRef])

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

    const updateData = useCallback(async () => {
        setIsFetching(true)
        if (table === 'risks') {
            await fetchRisks()
        } else if (table === 'categories') {
            await fetchCategories()
        }
        setIsFetching(false)
    }, [table, maxRows, onlyUnresolved, nameFilter, descriptionFilter, page])

    useEffect(() => {
        updateData().then()
    }, [table, maxRows, onlyUnresolved, nameFilter, descriptionFilter, page])

    return (
        <div className={'mb-12 p-2'}>
            <TablePagination page={page} setPage={setPage} />
            <div className="sticky top-0 z-10 border-b bg-background">
                <div className="flex w-full overflow-auto transition-colors hover:bg-muted/50" ref={externalHeaderRef}>
                    {columnWidths.map((width, index) => (
                        <div
                            key={index}
                            className="flex shrink-0 items-center px-4 py-3 text-sm font-medium"
                            style={{ width: `${width}px` }}
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
                    {isFetching ? (
                        table === 'categories' ? (
                            <Duplicate times={page === 1 ? 10 : maxRows}>
                                <PseudoCategoryRowInTable key={0} pulsating />
                            </Duplicate>
                        ) : (
                            <Duplicate times={maxRows}>
                                <PseudoRiskRowInTable key={0} pulsating />
                            </Duplicate>
                        )
                    ) : table === 'categories' ? (
                        categories
                            .slice((page - 1) * maxRows, page * maxRows)
                            .map((input, index) => <CategoryRowInTable key={index} input={input as Category} />)
                    ) : (
                        risks
                            .slice((page - 1) * maxRows, page * maxRows)
                            .map((input, index) => <RiskRowInTable key={index} input={input as Risk} />)
                    )}
                </TableBody>
            </Table>
            <TablePagination page={page} setPage={setPage} />
        </div>
    )
}

export default TableView
