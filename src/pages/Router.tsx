import { Toaster } from '@components/ui/toaster'
import useIsLoggedIn from '@hooks/useIsLoggedIn'
import AuthPage from '@pages/AuthPage'
import ContentPage from '@pages/ContentPage'
import { lazy, Suspense } from 'react'

const Header = lazy(() => import('@components/Header'))

const Router = () => {
    const { isLoggedIn } = useIsLoggedIn()

    return (
        <div className={'h-screen'}>
            <Toaster />
            <Suspense fallback={<div className={'flex w-screen bg-gray-800 p-9'} />}>
                <Header />
            </Suspense>
            <main>{isLoggedIn ? <ContentPage /> : <AuthPage />}</main>
        </div>
    )
}

export default Router
