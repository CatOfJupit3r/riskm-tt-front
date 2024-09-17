import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import { ApolloProvider } from '@apollo/client'
import APIService from '@services/APIService'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <ApolloProvider client={APIService.client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>
)
