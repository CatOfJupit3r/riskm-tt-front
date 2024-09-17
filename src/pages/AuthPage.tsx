import { Input } from '@components/ui/input'
import { useState } from 'react'
import { Button } from '@components/ui/button'
import { useToast } from '@hooks/useToast'
import APIService from '@services/APIService'

const AuthPage = () => {
    const [username, setUsername] = useState('')
    const { toast } = useToast()

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
                        APIService.login({ username })
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