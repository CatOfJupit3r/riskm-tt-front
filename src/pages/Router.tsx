import { useUserContext } from '@context/UserContext'
import ContentPage from '@pages/ContentPage'
import AuthPage from '@pages/AuthPage'
import React, { lazy, Suspense } from 'react'
import { Toaster } from '@components/ui/toaster'

const Header = lazy(() => import('@components/Header'))

const Router = () => {
    const { username } = useUserContext()

    return <div className={'h-screen'}>
        <Toaster />
        <Suspense fallback={<div className={'flex w-screen bg-gray-800 p-9'}/>}>
            <Header />
        </Suspense>
        <main>
            {
                username === null ? <AuthPage /> : <ContentPage />
            }
        </main>
    </div>

}

export default Router