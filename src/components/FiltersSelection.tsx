import { Button } from '@components/ui/button'
import { InputWithClearButton } from '@components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@components/ui/select'
import { Switch } from '@components/ui/switch'
import { useFiltersContext } from '@context/FiltersContext'
import { cn } from '@lib/utils'
import { useCallback, useState } from 'react'
import { BiCategory } from 'react-icons/bi'
import { FaCheck } from 'react-icons/fa'
import { MdTableRows } from 'react-icons/md'
import { VscIssueDraft } from 'react-icons/vsc'

const FiltersSelection = () => {
    const [tableInner, setTableInner] = useState<'categories' | 'risks'>('risks')
    const [includeResolvedInner, setIncludeResolvedInner] = useState(true)
    const [nameFilterInner, setNameFilterInner] = useState<string | null>(null)
    const [descriptionFilterInner, setDescriptionFilterInner] = useState<string | null>(null)
    const [maxRowsInner, setMaxRowsInner] = useState(10)

    const { filters, changeFilter } = useFiltersContext()

    const { table, includeResolved, name: nameFilter, description: descriptionFilter, maxRows } = filters

    const thereAreChanges = useCallback(() => {
        return (
            tableInner !== table ||
            includeResolvedInner !== includeResolved ||
            nameFilterInner !== nameFilter ||
            descriptionFilterInner !== descriptionFilter ||
            maxRowsInner !== maxRows
        )
    }, [
        tableInner,
        includeResolvedInner,
        nameFilterInner,
        descriptionFilterInner,
        maxRowsInner,
        table,
        includeResolved,
        nameFilter,
        descriptionFilter,
        maxRows,
    ])

    const handleApply = useCallback(() => {
        changeFilter({
            table: tableInner,
            includeResolved: includeResolvedInner,
            name: nameFilterInner,
            description: descriptionFilterInner,
            maxRows: maxRowsInner,
        })
    }, [tableInner, includeResolvedInner, nameFilterInner, descriptionFilterInner, maxRowsInner, changeFilter])

    return (
        <div
            className={
                'flex w-full items-center justify-between gap-2 rounded border-2 p-2 max-md:flex-col max-md:border-0 max-md:p-4'
            }
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleApply()
                } else if (e.key === 'Escape') {
                    setTableInner(table)
                    setIncludeResolvedInner(includeResolved)
                    setNameFilterInner(nameFilter)
                    setDescriptionFilterInner(descriptionFilter)
                    setMaxRowsInner(maxRows)
                }
            }}
        >
            <Select value={maxRowsInner.toString()} onValueChange={(value) => setMaxRowsInner(Number(value))}>
                <SelectTrigger className={'w-[15ch] max-md:w-full'}>
                    <div className={'flex flex-row items-center gap-1'}>
                        <MdTableRows />
                        {maxRowsInner}
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={'10'}>10</SelectItem>
                    <SelectItem value={'25'}>25</SelectItem>
                    <SelectItem value={'50'}>50</SelectItem>
                    <SelectItem value={'100'}>100</SelectItem>
                    <SelectItem value={'250'}>250</SelectItem>
                </SelectContent>
            </Select>

            <InputWithClearButton
                className={'w-full'}
                placeholder={'Name...'}
                value={nameFilterInner ?? ''}
                onChange={(e) => {
                    setNameFilterInner(e.target.value || null)
                }}
                onClear={() => setNameFilterInner(null)}
            />
            <InputWithClearButton
                className={'w-full'}
                placeholder={'Description...'}
                value={descriptionFilterInner ?? ''}
                onChange={(e) => {
                    setDescriptionFilterInner(e.target.value || null)
                }}
                onClear={() => setDescriptionFilterInner(null)}
            />
            <div className={'flex h-full items-center justify-end gap-2 max-md:w-full max-md:flex-col'}>
                <div className={'flex w-40 flex-row items-center gap-1 rounded-lg border-2 p-1 max-md:w-full'}>
                    <Switch
                        checked={includeResolvedInner}
                        onCheckedChange={(checked) => setIncludeResolvedInner(checked)}
                        disabled={tableInner === 'categories'}
                    />
                    <p
                        className={cn(
                            'text-nowrap p-1 text-center text-sm',
                            tableInner === 'categories' && 'opacity-50'
                        )}
                    >
                        Show resolved
                    </p>
                </div>
                <Button
                    className={'flex h-full w-32 items-center gap-1 font-bold max-md:w-full'}
                    onClick={() => {
                        if (tableInner === 'risks') {
                            setTableInner('categories')
                            setIncludeResolvedInner(false)
                        } else {
                            setTableInner('risks')
                        }
                    }}
                    variant={'secondary'}
                >
                    {tableInner === 'categories' ? (
                        <>
                            <BiCategory /> Categories
                        </>
                    ) : (
                        <>
                            <VscIssueDraft /> Risks
                        </>
                    )}
                </Button>
            </div>
            <Button
                className={'flex h-full items-center gap-1 font-bold max-md:w-full'}
                disabled={!thereAreChanges()}
                variant={'default'}
                onClick={handleApply}
            >
                <FaCheck /> Apply
            </Button>
        </div>
    )
}

export default FiltersSelection
