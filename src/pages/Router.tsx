import { useUserContext } from '@context/UserContext'
import ContentPage from '@pages/ContentPage'
import AuthPage from '@pages/AuthPage'
import React, { lazy, Suspense } from 'react'
import { Toaster } from '@components/ui/toaster'

const Header = lazy(() => import('@components/header'))

const Router = () => {
    const { username } = useUserContext()

    return <div>
        <Toaster />
        <Suspense fallback={<div className={'flex w-screen bg-gray-800 p-9'}/>}>
            <Header />
        </Suspense>
        <main className={'w-screen'}>
            {
                username === null ? <AuthPage /> : <ContentPage />
            }
        </main>
    </div>

}

export default Router