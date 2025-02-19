import {useUnit} from 'effector-react'
import {$info, fetchInfoFx} from './model.ts'
import {useEffect} from 'react'
import {Preloader} from '../common/Preloader'
import s from './Home.module.scss'
import {FramerRight} from '../HOC'

export const Home = () => {

    const [info, isLoading] = useUnit([$info, fetchInfoFx.pending])

    useEffect(() => {
        fetchInfoFx().finally(() => console.log('fetch finally!'))
    }, [])

    if (isLoading) return <Preloader/>

    return <div className={s.container}>

        <FramerRight width={'auto'} height={'auto'}>
            <h2 className={s.name}>{info.name}</h2>
        </FramerRight>
        <FramerRight width={'auto'} height={'auto'} duration={1.5} x={'90vw'}>
            <p className={s.tab}>Возраст: {info.age}</p>
        </FramerRight>
        <FramerRight width={'auto'} height={'auto'} duration={2.5}>
            <p className={s.tab}>
                <span>Стек технологий: </span>
                {info.tech}
            </p>
        </FramerRight>
        <FramerRight width={'50vw'} height={'auto'} duration={2} x={'50vw'}>
            <p className={s.tab}>{info.description}</p>
        </FramerRight>
        <FramerRight width={'15vw'} height={'auto'} duration={3.5} x={'85vw'}>
            <p className={s.tab}>P.S. Дизайнер из меня никудышный</p>
        </FramerRight>

    </div>
}