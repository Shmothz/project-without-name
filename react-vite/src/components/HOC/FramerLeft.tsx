import {FC, ReactNode, useRef} from 'react'
import {motion, useInView} from 'framer-motion'

type IFramerOps = {
    width?: string
    height?: string
    children: ReactNode
}

export const FramerLeft: FC<IFramerOps> = ({width = '200px', height= '200px', children}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true }); // Отслеживаем, когда элемент появляется в области видимости

    return (
        <motion.div
            ref={ref}
            initial={{ x: "-1vw" }} // Начальное положение за пределами экрана справа
            animate={isInView ? { x: '5vw' } : {}} // Анимация, когда элемент в зоне видимости
            transition={{ duration: 1, ease: "easeOut" }} // Плавная анимация
            style={{
                marginTop: '20px',
                width: width,
                height: height,
                backgroundColor: "lightblue",
                // margin: "20px",
            }}
        >
            {children}
        </motion.div>
    )
}