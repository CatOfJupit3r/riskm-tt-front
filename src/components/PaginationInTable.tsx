import { Button } from '@components/ui/button'
import { Pagination, PaginationContent, PaginationItem } from '@components/ui/pagination'
import { useFiltersContext } from '@context/FiltersContext'
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react'
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
import { Skeleton } from '@components/ui/skeleton'

const calculateMaxPages = (total: number, maxRows: number) => {
    return total ? Math.ceil(Math.max(total / maxRows, 1)) : 1
}

const PaginationInTable = ({
    page,
    setPage,
    total,
}: {
    page: number
    setPage: Dispatch<SetStateAction<number>>
    total: number | null
}) => {
    const { filters } = useFiltersContext()
    const { table, maxRows } = filters

    const maxPages = useMemo(() => {
        return calculateMaxPages(total ?? 1, maxRows)
    }, [table, total, maxRows])

    useEffect(() => {
        if (total === null) { // this is a loading state
            return
        }
        if (page > maxPages) {
            setPage(maxPages)
        }
    }, [page, maxPages, total])

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

export default PaginationInTable
