import TableFilterBar from '@components/TableFilterBar'
import TableView from '@components/TableView'
import { TableViewContextProvider } from '@context/TableViewContext'
import { Separator } from '@components/ui/separator'

const ContentPage = () => {
    return (
        <TableViewContextProvider>
            <div className={'mt-10 flex w-full justify-center'}>
                <div className={'flex w-full max-w-6xl flex-col gap-4 px-4'}>
                    <TableFilterBar />
                    <Separator />
                    <TableView />
                </div>
            </div>
        </TableViewContextProvider>
    )
}

export default ContentPage
