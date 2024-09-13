import React from 'react'
import './styles/index.css'
import './styles/globals.css'
import { UserContextProvider } from '@context/UserContext'
import Router from '@pages/Router'

function App() {
    return <UserContextProvider>
        <Router />
    </UserContextProvider>
}

export default App
