import {Route, Routes} from 'react-router-dom'
import {Users} from './Users'
import {routes} from '../constants/routes.ts'
import {Header} from './Header'


export const Root = () => {
    return <>
        <Header/>
        <Routes>{
            routes.map((route) => <Route key={route.id} path={route.path} element={<Users/>}/>)
        }</Routes>
    </>

}