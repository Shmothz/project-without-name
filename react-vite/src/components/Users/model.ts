import {createEffect, createEvent, createStore, sample} from 'effector'
import {IUser} from './types.ts'
import {debounce, not} from 'patronum'

const BASE_URL = 'http://localhost:3000'

export const fetchUsersFx = createEffect<void, IUser[], Error>(async () => {
    return await fetch(BASE_URL + '/users')
        .then((res) => res.json())
        .catch((error) => error)
})

export const $users = createStore<IUser[]>([])
export const usersChanged = createEvent<IUser[]>()

export const $countUsers = createStore<number>(0)
export const countUsersChanged = createEvent<number>()

$users.on(usersChanged, (_, payload) => payload)
$countUsers.on(countUsersChanged, (_, payload) => payload)

fetchUsersFx.done.watch(({result}) => {
    console.log(result)
    usersChanged(result)
    countUsersChanged(result.length)
})

export const fetchFilteredUsersFx = createEffect<string, IUser[], Error>(async (name: string) => {
    return await fetch(BASE_URL + '/users' + `?name=${name}`)
        .then((res) => res.json())
        .catch((error) => error)
})

export const $filterText = createStore<string>('')
export const filterTextChanged = createEvent<string>()

fetchFilteredUsersFx.done.watch(({result}) => {
    usersChanged(result)
})

$filterText.on(filterTextChanged, (_, payload) => payload)

const performFilter = debounce({source: filterTextChanged, timeout: 500})

sample({
    clock: performFilter,
    source: $filterText,
    filter: not(fetchFilteredUsersFx.pending),
    target: fetchFilteredUsersFx
})



