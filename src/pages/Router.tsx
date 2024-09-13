import { useUserContext } from '@context/UserContext'
import ContentPage from '@pages/ContentPage'
import AuthPage from '@pages/AuthPage'
import React from 'react'
import { Toaster } from '@components/ui/toaster'
import { Button } from '@components/ui/button'

const Router = () => {
    const { username, changeUsername } = useUserContext()

    return <div>
        <Toaster />
        <header className={'flex w-screen flex-row items-center justify-between bg-gray-800 p-4 text-white'}>
            <img
                src={'https://cdn.discordapp.com/attachments/1035558785051275265/1284198502565417041/1284198376111472690.webp?ex=66e5c28e&is=66e4710e&hm=63c2712b932f4354313cf505a5e003031b6e3324715bec0eb703e1a9e06da45f&'}
                alt={'logo'}
                className={'size-10'}
            />
            {
                username !== null && <div className={'flex flex-row items-center gap-4'}>
                    <p className={'text-lg'}>
                        @{username}
                    </p>
                    <Button
                        variant={'ghost'}
                        className={'text-lg'}
                        onClick={() => {
                            window.localStorage.removeItem('username')
                            changeUsername(null)
                        }}
                    >
                        Sign out
                    </Button>
                </div>
            }
        </header>
        <main className={'w-screen'}>
            {
                username === null ? <AuthPage /> : <ContentPage />
            }
        </main>
    </div>

}

export default Router