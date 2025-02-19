import {Route, Routes} from 'react-router-dom'
import {routes} from '../constants/routes.ts'
import {Home} from './Home'
import {NotFound} from './NotFound'
import {lazy, Suspense} from 'react'
import {Preloader} from './common/Preloader'

const UsersLazy = lazy(() => import('./Users').then(({Users}) => ({default: Users})))
const DndLazy = lazy(() => import('./Dnd').then(({Dnd}) => ({default: Dnd})))
const SpecificationsLazy = lazy(() => import('./Specifications').then(({Specifications}) => ({default: Specifications})))
const ThreeLazy = lazy(() => import('./Three').then(({Three}) => ({default: Three})))

export const Root = () => {
    return <Suspense fallback={<Preloader/>}>
        <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route id={routes.users.id} path={routes.users.path} element={<UsersLazy/>}/>
            <Route id={routes.dnd.id} path={routes.dnd.path} element={<DndLazy/>}/>
            <Route id={routes.specifications.id} path={routes.specifications.path} element={<SpecificationsLazy />} />
            <Route id={routes.three.id} path={routes.three.path} element={<ThreeLazy />} />
            <Route path={'*'} element={<NotFound/>}/>
        </Routes>
    </Suspense>
}