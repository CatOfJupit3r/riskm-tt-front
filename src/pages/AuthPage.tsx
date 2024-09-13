import { Input } from '@components/ui/input'
import { useCallback, useEffect, useState } from 'react'
import { useUserContext } from '@context/UserContext'
import { Button } from '@components/ui/button'
import { useToast } from '@components/ui/use-toast'

const AuthPage = () => {
    const [username, setUsername] = useState('')
    const { toast } = useToast()
    const { changeUsername } = useUserContext()

    const setUsernameFromStorage = useCallback(
        () => {
            const usernameInStorage = localStorage.getItem('username')
            if (usernameInStorage && usernameInStorage !== username && usernameInStorage.length > 0) {
                setUsername(usernameInStorage)
                localStorage.removeItem('username')
            }
        }, [username],
    )

    useEffect(() => {
        setUsernameFromStorage()
    }, [])

    return (
        <div className={'flex w-full justify-center'}>
            <div className={'mt-56 flex w-full max-w-2xl flex-col items-center justify-center gap-4 border-2 p-4'}>
                <div className={'flex w-full flex-col gap-2'}>
                    <p>
                        Username
                    </p>
                    <Input
                        className={'w-full'}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <Button
                    className={'w-full'}
                    onClick={() => {
                        if (username.length === 0) {
                            toast({
                                title: 'Error',
                                description: 'Username cannot be empty',
                                variant: 'destructive',
                            })
                            return
                        }
                        changeUsername(username)
                        localStorage.setItem('username', username)
                    }}
                    disabled={username.length === 0}
                >
                    Login
                </Button>
            </div>
        </div>
    )
}

export default AuthPage