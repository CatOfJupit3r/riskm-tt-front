import { Button } from '@components/ui/button'
import { Pagination, PaginationContent, PaginationItem } from '@components/ui/pagination'
import { useTableViewContext } from '@context/TableViewContext'
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react'
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdNavigateBefore, MdNavigateNext } from 'react-icons/md'

const TablePagination = ({ page, setPage }: { page: number; setPage: Dispatch<SetStateAction<number>> }) => {
    const { table, maxRows, risks, categories } = useTableViewContext()
    const maxPages = useMemo(() => {
        if (table === 'risks') {
            const totalQuery = risks.length
            return totalQuery ? Math.floor(Math.max(totalQuery / maxRows, 1)) : 1
        } else {
            const totalQuery = categories.length
            return totalQuery ? Math.floor(Math.max(totalQuery / maxRows, 1)) : 1
        }
    }, [risks, categories, maxRows])

    useEffect(() => {
        setPage(1)
    }, [table])

    useEffect(() => {
        if (page > maxPages) {
            setPage(maxPages)
        }
    }, [page, maxPages])

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <Button
                        variant={'ghost'}
                        onClick={() => {
                            setPage(1)
                        }}
                        disabled={page === 1}
                    >
                        <MdKeyboardDoubleArrowLeft />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button
                        variant={'ghost'}
                        onClick={() => setPage((prev) => (prev === 1 ? 1 : prev - 1))}
                        disabled={page === 1}
                    >
                        <MdNavigateBefore />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button variant={'ghost'} disabled={true}>
                        {page}
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button
                        variant={'ghost'}
                        onClick={() => {
                            setPage((prev) => prev + 1)
                        }}
                        disabled={page === maxPages}
                    >
                        <MdNavigateNext />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button
                        variant={'ghost'}
                        onClick={() => {
                            setPage(maxPages)
                        }}
                        disabled={page === maxPages}
                    >
                        <MdKeyboardDoubleArrowRight />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default TablePagination
