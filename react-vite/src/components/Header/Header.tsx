import {routes} from '../../constants/routes.ts'
import {Link} from 'react-router-dom'

export const Header = () => {
    return <div>
        {
            routes.map((route) => <Link key={route.id} to={route.path}>{route.title}</Link>)
        }
    </div>
}