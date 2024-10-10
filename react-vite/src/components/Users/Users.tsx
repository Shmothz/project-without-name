import {memo, useEffect} from 'react'
import {$users, fetchUsersFx} from './model.ts'
import {useUnit} from 'effector-react'
import {Preloader} from '../common/Preloader'
import s from './Users.module.scss'

export const Users = memo(() => {

    const [users, isLoading] = useUnit([$users, fetchUsersFx.pending])

    useEffect(() => {
        fetchUsersFx().finally(() => console.log('fetch finally!'))
    }, [])

    if (isLoading) return <Preloader/>

    return <div className={s.list}>
        {users.map((user) => <div key={user.name}>{user.name}</div>)}
    </div>
})