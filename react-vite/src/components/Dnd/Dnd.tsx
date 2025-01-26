import {useState, DragEvent} from 'react'
import s from './Dnd.module.scss'

const initialCards = [
    {id: '1', order: '1', name: 'name 1'},
    {id: '2', order: '2', name: 'name 2'},
    {id: '3', order: '3', name: 'name 3'},
    {id: '4', order: '4', name: 'name 4'},
]

type ICard = {
    id: string,
    order: string,
    name: string
}

export const Dnd = () => {

    const [cards, setCards] = useState<ICard[]>(initialCards)
    const [currentCard, setCurrentCard] = useState<null | ICard>(null)

    const handleDragStart = (card: ICard) => {
        setCurrentCard(card)
    }
    const handleDrop = (e: DragEvent<HTMLDivElement>, card: ICard) => {
        e.preventDefault()
        setCards(cards.map((c) => {
            if (c.id === card.id) {
                return {...c, order: currentCard!.order}
            }
            if (c.id === currentCard!.id) {
                return {...c, order: card.order}
            }
            return c
        }))
    }
    const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }
    const handleDragLeave = () => {
        // Срабатывает, когда переносим элемент покидает зону текущего.
    }
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        // Срабатывает, когда переносим элемент повиснет над текущим.
        e.preventDefault()
    }
    const sortCards = (a: ICard, b: ICard) => {
        if ( a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    return <div className={s.parent}>
        {
            cards.sort(sortCards).map((card) => <div
                key={card.id}
                className={s.card}
                draggable
                onDragStart={() => handleDragStart(card)}
                onDrop={(e) => handleDrop(e, card)}
                onDragEnd={handleDragEnd}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
            >
                {card.name}
            </div>)
        }
    </div>
}