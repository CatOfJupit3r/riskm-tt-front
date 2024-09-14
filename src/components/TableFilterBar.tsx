import { Button } from '@components/ui/button'
import { DelayedInputWithClearButton } from '@components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@components/ui/select'
import { Switch } from '@components/ui/switch'
import { useTableViewContext } from '@context/TableViewContext'
import { cn } from '@lib/utils'
import { useCallback } from 'react'
import { BiCategory } from 'react-icons/bi'
import { MdTableRows } from 'react-icons/md'
import { VscIssueDraft } from 'react-icons/vsc'

const TableFilterBar = () => {
    const {
        table,
        changeTable,
        onlyUnresolved,
        changeOnlyUnresolved,
        nameFilter,
        descriptionFilter,
        changeFilter,
        resetFilter,
        maxRows,
        changeMaxRows,
    } = useTableViewContext()

    const handleTableChange = useCallback(() => {
        table === 'categories' ? changeTable('risks') : changeTable('categories')
    }, [table, changeTable])

    return (
        <div
            className={
                'flex w-full items-center justify-between gap-2 rounded border-2 p-2 max-md:flex-col max-md:border-0 max-md:p-4'
            }
        >
            <Select value={maxRows.toString()} onValueChange={(value) => changeMaxRows(Number(value))}>
                <SelectTrigger className={'w-[15ch] max-md:w-full'}>
                    <div className={'flex flex-row items-center gap-1'}>
                        <MdTableRows />
                        {maxRows}
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
            <div className={'flex w-full gap-1 max-md:flex-col'}>
                <DelayedInputWithClearButton
                    className={'w-full'}
                    placeholder={'Name...'}
                    value={nameFilter ?? ''}
                    callback={useCallback(
                        (value) => {
                            changeFilter('name', value)
                        },
                        [changeFilter]
                    )}
                    onClear={() => resetFilter('name')}
                />
                <DelayedInputWithClearButton
                    className={'w-full'}
                    placeholder={'Description...'}
                    value={descriptionFilter ?? ''}
                    callback={useCallback(
                        (value) => {
                            changeFilter('description', value)
                        },
                        [changeFilter]
                    )}
                    onClear={() => resetFilter('description')}
                />
            </div>
            <div className={'flex h-full items-center justify-end gap-2 max-md:w-full max-md:flex-col'}>
                <div className={'flex flex-row items-center gap-1 rounded-lg border-2 p-1 max-md:w-full'}>
                    <Switch
                        checked={onlyUnresolved}
                        onCheckedChange={(checked) => changeOnlyUnresolved(checked)}
                        disabled={table === 'categories'}
                    />
                    <p className={cn('text-nowrap p-1 text-center text-sm', table === 'categories' && 'opacity-50')}>
                        Show resolved
                    </p>
                </div>
                <Button
                    className={'flex h-full w-32 items-center gap-1 font-bold max-md:w-full'}
                    onClick={handleTableChange}
                >
                    {table === 'categories' ? (
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
        </div>
    )
}

export default TableFilterBar
