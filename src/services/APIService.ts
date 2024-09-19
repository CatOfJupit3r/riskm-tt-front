import { ApolloClient, InMemoryCache } from '@apollo/client'
import { EventEmitter } from 'events'

class APIService {
    emitter = new EventEmitter()

    eventTypes = {
        LOGIN_STATUS_CHANGED: 'LOGIN_STATUS_CHANGED',
        LOGIN: 'LOGIN',
        LOGOUT: 'LOGOUT',
    }

    public username: string | null = null
    public client: ApolloClient<unknown>

    constructor() {
        console.log('process.env.REACT_APP_BACKEND_URL', process.env.REACT_APP_BACKEND_URL)
        this.client = new ApolloClient({
            uri: process.env.REACT_APP_BACKEND_URL,
            cache: new InMemoryCache({}),
        })
        this.username = this.getUsernameStorage()
    }

    private getUsernameStorage(): string | null {
        return localStorage.getItem('username')
    }

    private setUsernameStorage(username: string) {
        localStorage.setItem('username', username)
    }

    public getHeaders = (): Record<string, string> => {
        const headers: Record<string, string> = {}
        if (this.username) {
            headers['Authorization'] = this.username
        }
        return headers
    }

    public isLoggedIn() {
        const token = this.getUsernameStorage()
        return !!token
    }

    public login({ username }: { username: string }) {
        this.username = username
        this.setUsernameStorage(username)

        this.emitter.emit(this.eventTypes.LOGIN_STATUS_CHANGED, true)
        this.emitter.emit(this.eventTypes.LOGIN)
    }

    public logout() {
        localStorage.removeItem('username')

        this.emitter.emit(this.eventTypes.LOGIN_STATUS_CHANGED, false)
        this.emitter.emit(this.eventTypes.LOGOUT)
    }

    public onLoginStatusChange(cb: (isLoggedIn: boolean) => void): () => void {
        this.emitter.on(this.eventTypes.LOGIN_STATUS_CHANGED, cb)

        return () => {
            this.emitter.off(this.eventTypes.LOGIN_STATUS_CHANGED, cb)
        }
    }

    public onLogin(cb: (isLoggedIn: boolean) => void): () => void {
        this.emitter.on(this.eventTypes.LOGIN, cb)

        return () => {
            this.emitter.off(this.eventTypes.LOGIN, cb)
        }
    }
}

export default new APIService()
