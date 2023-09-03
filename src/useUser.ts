import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { singletonHook } from 'react-singleton-hook'

interface IUser {
    id: number
    name?: string
    login?: string
    avatar_url?: string
}

interface IUseUser {
    user: IUser
    getNewUser: (login: string) => Promise<void>
    nameLenght?: string
}

const initValues: IUseUser = {
    user: {
        id: 0,
    },
    getNewUser: async (login: string) => {
        login === login
    },
}

export const useUser = singletonHook(initValues, () => {
    const [user, _setUser] = useState<IUser>(initValues.user)
    const setUser = useCallback((newValue: IUser) => {
        // console.log("change to:", newValue);
        // persist save opn cookie/localstorage/sessionstorage
        _setUser(newValue)
    }, [])

    useEffect(() => {
        console.log('pass here useUser Effect')
    })

    const getNewUser = async (login: string) => {
        try {
            const result = await axios.get(
                `https://api.github.com/users/${login}`
            )
            if (result.data) {
                // const { name, id, login } = result.data;
                console.log(result.data)
                setUser(result.data)
                return
            }

            setUser(initValues.user)
        } catch (error) {
            console.log('error', error)
            setUser(initValues.user)
        }
    }

    const nameLenght = !user.name
        ? undefined
        : `${user.name.length || 0} caracteres in name`

    return {
        user,
        getNewUser,
        nameLenght,
    }
})
