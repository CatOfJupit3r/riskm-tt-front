import { Button } from '@components/ui/button'
import useIsLoggedIn from '@hooks/useIsLoggedIn'
import APIService from '@services/APIService'

const Header = () => {
    const { isLoggedIn } = useIsLoggedIn()

    return (
        <header className={'flex w-full flex-row items-center justify-between bg-gray-800 p-4 text-white'}>
            <img
                src={
                    'https://cdn.discordapp.com/attachments/1035558785051275265/1284198502565417041/1284198376111472690.webp?ex=66e9b70e&is=66e8658e&hm=b531710a01192c823346a446115ea4964c1f03318f4dc58835aff194c5eb41ab&'
                }
                alt={'logo'}
                className={'size-10'}
            />
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
