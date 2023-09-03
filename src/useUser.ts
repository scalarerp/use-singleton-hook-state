import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { singletonHook } from 'react-singleton-hook'
// import { getPersist, setPersist } from './util/localStorage'

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

// const initUser = getPersist('User')as IUser||{id:0}
 const initUser = {id:0}

const initValues: IUseUser = {
    user: initUser,
    getNewUser: async (login: string) => {
        login === login
    },
}

export const useUser = singletonHook(initValues, () => {
    const [user, _setUser] = useState<IUser>(initValues.user)
    const handleSetUser = useCallback((newValue: IUser) => {
        // console.log("change to:", newValue);       
        // setPersist('User', newValue)
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
                handleSetUser(result.data)
                return
            }

            handleSetUser(initValues.user)
        } catch (error) {
            console.log('error', error)
            handleSetUser(initValues.user)
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
