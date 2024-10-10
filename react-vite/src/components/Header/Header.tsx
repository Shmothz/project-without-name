import {routes} from '../../constants/routes.ts'
import {Link} from 'react-router-dom'
import s from './Header.module.scss'

export const Header = () => {
    return <div className={s.container}>
        {
            Object.values(routes).map((route) => <Link key={route.id} to={route.path}>{route.title}</Link>)
        }
    </div>
}