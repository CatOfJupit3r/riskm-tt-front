import { Button } from '@components/ui/button'
import useIsLoggedIn from '@hooks/useIsLoggedIn'
import APIService from '@services/APIService'

const Header = () => {
    const { isLoggedIn } = useIsLoggedIn()

    return (
        <header className={'flex w-full flex-row items-center justify-between bg-gray-800 p-4 text-white'}>
            <img src={'hampter.webp'} alt={'logo'} className={'size-10'} />
            {isLoggedIn ? (
                <div className={'flex flex-row items-center gap-4'}>
                    <p className={'text-lg'}>@{APIService.username}</p>
                    <Button
                        variant={'ghost'}
                        className={'text-lg'}
                        onClick={() => {
                            window.localStorage.removeItem('username')
                            APIService.logout()
                        }}
                    >
                        Sign out
                    </Button>
                </div>
            ) : null}
        </header>
    )
}

export default Header
