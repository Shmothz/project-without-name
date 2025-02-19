import {FC, ReactNode, useRef} from 'react'
import {motion, useInView} from 'framer-motion'

type IFramerOps = {
    width?: string
    height?: string
    duration?: number
    x?: string
    children: ReactNode
}

export const FramerRight: FC<IFramerOps> = ({width = '200px', height= '200px', duration = 1, x = '70vw', children}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true }); // Отслеживаем, когда элемент появляется в области видимости

    return (
        <motion.div
            ref={ref}
            initial={{ x: "100vw" }} // Начальное положение за пределами экрана справа
            animate={isInView ? { x: x } : {}} // Анимация, когда элемент в зоне видимости
            transition={{ duration, ease: "easeOut" }} // Плавная анимация
            style={{
                marginTop: '36px',
                width: width,
                height: height,
                backgroundColor: "lightblue",
                borderRadius: '6px',
                // margin: "20px",
            }}
        >
            {children}
        </motion.div>
    )
}