import { Button } from '@components/ui/button'
import { InputWithClearButton } from '@components/ui/input'
import { Switch } from '@components/ui/switch'
import { useTableViewContext } from '@context/TableViewContext'
import { useCallback } from 'react'
import { BiCategory } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'
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
            <Button className={'flex gap-1 hover:bg-green-600 max-md:w-full'}>
                <IoMdAdd />
                New
            </Button>
            <div className={'flex w-full gap-1 max-md:flex-col'}>
                <InputWithClearButton
                    className={'w-full'}
                    placeholder={'Name...'}
                    value={nameFilter ?? ''}
                    onChange={(e) => changeFilter('name', e.target.value)}
                    onClear={() => resetFilter('name')}
                />
                <InputWithClearButton
                    className={'w-full'}
                    placeholder={'Description...'}
                    value={descriptionFilter ?? ''}
                    onChange={(e) => changeFilter('description', e.target.value)}
                    onClear={() => resetFilter('description')}
                />
            </div>
            <div className={'flex h-full items-center justify-end gap-2 max-md:w-full max-md:flex-col'}>
                <div className={'flex flex-row items-center gap-1 rounded-lg border-2 p-1 max-md:w-full'}>
                    <Switch checked={onlyUnresolved} onCheckedChange={(checked) => changeOnlyUnresolved(checked)} />
                    <p className={'text-nowrap p-1 text-center text-sm'}>Show resolved</p>
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
