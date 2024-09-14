import Duplicate from '@components/Duplicate'
import {
    CategoryRowInTable,
    PseudoCategoryRowInTable,
    PseudoRiskRowInTable,
    RiskRowInTable,
} from '@components/TableRowWithData'
import TablePagination from '@components/TablePagination'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@components/ui/table'
import { useTableViewContext } from '@context/TableViewContext'
import { Category, Risk } from '@models/API'
import APIService from '@services/APIService'
import { useCallback, useEffect, useRef, useState } from 'react'

const TableView = () => {
    const { onlyUnresolved, table, maxRows, descriptionFilter, nameFilter, data, changeData, changeTotalQuery } =
        useTableViewContext()
    const [page, setPage] = useState(1)
    const [columnWidths, setColumnWidths] = useState<Array<number>>([])
    const tableRef = useRef<HTMLTableElement>(null)
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

    const updateData = useCallback(async () => {
        setIsFetching(true)
        const response = await APIService.getRows(
            table,
            (page - 1) * maxRows,
            page * maxRows,
            nameFilter,
            descriptionFilter,
            onlyUnresolved
        )
        if (response.success) {
            changeData(response.data.rows)
            changeTotalQuery(response.data.total)
        } else {
            console.log('Failed to fetch data', response.error)
        }
        setIsFetching(false)
    }, [table, maxRows, onlyUnresolved, nameFilter, descriptionFilter, page])

    useEffect(() => {
        updateData().then()
    }, [table, maxRows, onlyUnresolved, nameFilter, descriptionFilter, page])

    return (
        <div className={'mb-12 p-2'}>
            <TablePagination page={page} setPage={setPage} />
            <div className="sticky top-0 z-10 overflow-auto border-b bg-background">
                <div className="flex transition-colors hover:bg-muted/50">
                    {columnWidths.map((width, index) => (
                        <div
                            key={index}
                            className="flex shrink-0 items-center px-4 py-3 text-sm font-medium"
                            style={{ width: `${width}px` }}
                        >
                            {
                                (table === 'categories'
                                    ? ['Name', 'Description', 'Created by', 'Actions']
                                    : ['Name', 'Description', 'Status', 'Created by', 'Actions'])[index]
                            }
                        </div>
                    ))}
                </div>
            </div>
            <Table ref={tableRef} className={'overflow-auto'}>
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
                            <TableHead>Created by</TableHead>
                            <TableHead>Actions</TableHead>
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
                    ) : (
                        data.map((input, index) => {
                            if (table === 'categories') {
                                return <CategoryRowInTable key={index} input={input as Category} />
                            } else {
                                return <RiskRowInTable key={index} input={input as Risk} />
                            }
                        })
                    )}
                </TableBody>
            </Table>
            <TablePagination page={page} setPage={setPage} />
        </div>
    )
}

export default TableView
