import { createContext, ReactNode, useCallback, useContext, useState } from 'react'

interface UserContextType {
    username: string | null
    changeUsername: (username: string | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [username, setUsername] = useState<null | string>(null)

    const changeUsername = useCallback(
        (username: string | null) => {
            setUsername(username)
        },
        [setUsername]
    )

    return (
        <UserContext.Provider
            value={{
                username,
                changeUsername
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserContextProvider.')
    }
    return context as UserContextType
}
