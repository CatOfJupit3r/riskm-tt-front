import FiltersSelection from '@components/FiltersSelection'
import RiskAndCategoriesView from '@components/RiskAndCategoriesView'
import { FiltersContextProvider } from '@context/FiltersContext'
import { Separator } from '@components/ui/separator'

const ContentPage = () => {
    return (
        <FiltersContextProvider>
            <div className={'mt-10 flex w-full justify-center'}>
                <div className={'flex w-full max-w-6xl flex-col gap-4 px-4'}>
                    <FiltersSelection />
                    <Separator />
                    <RiskAndCategoriesView />
                </div>
            </div>
        </FiltersContextProvider>
    )
}

export default ContentPage
