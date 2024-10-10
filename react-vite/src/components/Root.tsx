import {Route, Routes} from 'react-router-dom'
import {routes} from '../constants/routes.ts'
import {Home} from './Home'
import {NotFound} from './NotFound'
import {lazy, Suspense} from 'react'
import {Preloader} from './common/Preloader'

const UsersLazy = lazy(() => import('./Users').then(({Users}) => ({default: Users})))

export const Root = () => {
    return <Suspense fallback={<Preloader/>}>
        <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route id={routes.users.id} path={routes.users.path} element={<UsersLazy/>}/>
            <Route path={'*'} element={<NotFound/>}/>
        </Routes>
    </Suspense>

}