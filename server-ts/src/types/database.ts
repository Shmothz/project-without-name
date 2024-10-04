export type IDatabase = {
    users: IUser[]
    settings: ISettings
}

type IUser = {
    id: number
    name: string
}

type ISettings = {
    firstField: boolean,
    secondField: string,
    thirdField: boolean
}