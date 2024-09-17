import APIService from '@services/APIService'
import { useEffect, useState } from 'react'

const useIsLoggedIn = () => {
    const [loggedIn, setLoggedIn] = useState(APIService.isLoggedIn())

    useEffect(() => {
        const unsubscribeFromLoginStatusChange = APIService.onLoginStatusChange((token) => {
            setLoggedIn(token)
        })
        const unsubscribeFromOnLogin = APIService.onLogin(() => {
            console.log('User was logged in!')
        })
        return () => {
            unsubscribeFromLoginStatusChange()
            unsubscribeFromOnLogin()
        }
    }, [])

    return {
        isLoggedIn: loggedIn,
    }
}

export default useIsLoggedIn
