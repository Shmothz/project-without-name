import {createEffect, createEvent, createStore} from 'effector'
import {IUser} from './types.ts'

const BASE_URL = 'http://localhost:3000'

export const fetchUsersFx = createEffect(async () => {
    return await fetch(BASE_URL + '/users')
        .then((res) => res.json())
        .catch((error) => error)
})

export const $users = createStore<IUser[]>([])
export const usersChanged = createEvent<IUser[]>()

export const $countUsers = createStore<number>(0)
export const countUsersChanged = createEvent<number>()

$users.on(usersChanged, (state, payload) => [...state, ...payload])
$countUsers.on(countUsersChanged, (_, payload) => payload)

fetchUsersFx.done.watch(({result}) => {
    console.log(result)
    usersChanged(result)
    countUsersChanged(result.length)
})

