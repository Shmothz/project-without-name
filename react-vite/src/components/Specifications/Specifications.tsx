import {ChangeEventHandler, useState} from 'react'

const initialParams = [
    {
        "id": 1,
        "name": "Назначение"
    },
    {
        "id": 2,
        "name": "Длина"
    },
    {
        "id": 3,
        "name": "Ширина"
    }
]
const initialParamValues = [
    {
        "paramId": 1,
        "value": "повседневное"
    },
    {
        "paramId": 2,
        "value": "макси"
    },
    {
        "paramId": 3,
        "value": "вотстока"
    }
]

type IField = {
    id: number // id
    label: string // param label
    initialValue: (paramId: number) => string
    removeField: (id: number) => void
}
const Field = ({id, label, initialValue, removeField}: IField) => {

    const [value, setValue] = useState(initialValue(id))

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value)
    }

    return <div>
        <label>{label}</label>
        <input id={String(id)} value={value} onChange={handleChange}/>
        <button onClick={() => removeField(id)}>Delete field</button>
    </div>
}

export const Specifications = () => {

    const [params, setParams] = useState(initialParams)
    const [paramValues, setParamValues] = useState(initialParamValues)
    const [newFieldValue, setNewFieldValue] = useState<string>('')

    const addField = () => {
        const newField = {
            id: new Date().getDate(),
            name: newFieldValue
        }
        const newParam = {
            paramId: new Date().getDate(),
            value: ''
        }
        setParams((prevState) => [...prevState, newField])
        setParamValues((prevState) => [...prevState, newParam])
        setNewFieldValue('')
    }

    const findValue = (id: number) => {
        let initialValue = ''
        const findValue = paramValues.find((p) => p.paramId === id)
        if (findValue) initialValue = findValue.value
        return initialValue
    }

    const removeField = (id: number) => {
        setParams((prevState) => prevState.filter((p) => p.id !== id))
    }

    return <div>
        <input value={newFieldValue} onChange={(e) => setNewFieldValue(e.target.value)}/>
        <button onClick={addField}>Добавить параметр</button>
        {
            params.map((p) => <Field key={p.id + p.name} id={p.id} label={p.name} initialValue={findValue} removeField={removeField}
            />)
        }
        <button onClick={() => console.log(params)}>
            Send spec
        </button>
    </div>
}