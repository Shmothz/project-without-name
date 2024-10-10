import {ChangeEvent, memo, useEffect} from 'react'
import {$filterText, $users, fetchUsersFx, filterTextChanged} from './model.ts'
import {useUnit} from 'effector-react'
import {Preloader} from '../common/Preloader'
import s from './Users.module.scss'

export const Users = memo(() => {

    const [users, isLoading, filterText, filterEvent] = useUnit([$users, fetchUsersFx.pending, $filterText, filterTextChanged])

    useEffect(() => {
        fetchUsersFx().finally(() => console.log('fetch finally!'))
    }, [])

    const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
        filterEvent(e.target.value)
    }

    if (isLoading) return <Preloader/>

    return <div>
        <input value={filterText} onChange={handleFilter}/>
        <div className={s.list}>
        {users.map((user) => <div key={user.name}>{user.name}</div>)}
    </div>
    </div>
})