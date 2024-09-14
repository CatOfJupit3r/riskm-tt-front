import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import { Skeleton } from '@components/ui/skeleton'
import { TableCell, TableRow } from '@components/ui/table'
import { Category, Risk } from '@models/API'
import { IoTrashBinOutline } from 'react-icons/io5'
import { useTableViewContext } from '@context/TableViewContext'
import Highlighter from 'react-highlight-words'

export const RiskRowInTable = ({ input }: { input: Risk }) => {
    const { nameFilter, descriptionFilter } = useTableViewContext()

    return (
        <TableRow>
            <TableCell className={'flex h-full w-36 items-center break-words max-md:w-auto'}>
                <Highlighter
                    searchWords={[nameFilter || '']}
                    textToHighlight={input.name}
                    highlightClassName={'bg-primary text-white'}
                />
            </TableCell>
            <TableCell className={'break-words text-justify'}>
                <Highlighter
                    searchWords={[descriptionFilter || '']}
                    textToHighlight={input.description}
                    highlightClassName={'bg-primary text-white'}
                />
            </TableCell>
            <TableCell>
                <Badge
                    variant={input.resolved ? 'default' : 'destructive'}
                    className={'flex w-20 items-center justify-center text-xs'}
                >
                    {input.resolved ? 'Resolved' : 'Unresolved'}
                </Badge>
            </TableCell>
            <TableCell className={'w-28 break-all'}>{input.categoryId}</TableCell>
            <TableCell className={'w-36 break-all'}>{input.createdBy}</TableCell>
            <TableCell>
                <Button variant={'destructiveGhost'} size={'icon'} className={'border-primary'}>
                    <IoTrashBinOutline />
                </Button>
            </TableCell>
        </TableRow>
    )
}

export const PseudoRiskRowInTable = ({ pulsating }: { pulsating?: boolean }) => {
    return (
        <TableRow>
            <TableCell>
                <Skeleton pulsating={pulsating} className={'h-10 w-40'} />
            </TableCell>
            <TableCell>
                <Skeleton pulsating={pulsating} className={'h-10 w-60'} />
            </TableCell>
            <TableCell>
                <Skeleton pulsating={pulsating} className={'h-10 w-20'} />
            </TableCell>
            <TableCell>
                <Skeleton pulsating={pulsating} className={'h-10 w-40'} />
            </TableCell>
            <TableCell>
                <Skeleton pulsating={pulsating} className={'h-10 w-40'} />
            </TableCell>
            <TableCell>
                <Skeleton pulsating={pulsating} className={'size-10'} />
            </TableCell>
        </TableRow>
    )
}

export const CategoryRowInTable = ({ input }: { input: Category }) => {
    const { nameFilter, descriptionFilter } = useTableViewContext()

    return (
        <TableRow>
            <TableCell>
                <Highlighter
                    searchWords={[nameFilter || '']}
                    textToHighlight={input.name}
                    highlightClassName={'bg-primary text-white'}
                />
            </TableCell>
            <TableCell>
                <Highlighter
                    searchWords={[descriptionFilter || '']}
                    textToHighlight={input.description}
                    highlightClassName={'bg-primary text-white'}
                />
            </TableCell>
            <TableCell>{input.createdBy}</TableCell>
            <TableCell>
                <Button variant={'destructive'} size={'icon'}>
                    <IoTrashBinOutline />
                </Button>
            </TableCell>
        </TableRow>
    )
}

export const PseudoCategoryRowInTable = ({ pulsating }: { pulsating?: boolean }) => {
    return (
        <TableRow>
            <TableCell>
                <Skeleton pulsating={pulsating} className={'h-10 w-40'} />
            </TableCell>
            <TableCell>
                <Skeleton pulsating={pulsating} className={'h-10 w-96'} />
            </TableCell>
            <TableCell>
                <Skeleton pulsating={pulsating} className={'h-10 w-40'} />
            </TableCell>
            <TableCell>
                <Skeleton pulsating={pulsating} className={'size-10'} />
            </TableCell>
        </TableRow>
    )
}
