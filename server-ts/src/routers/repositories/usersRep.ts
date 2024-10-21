import db from '../../db.json'

export const usersRep = {
    findUsers(name: string | undefined) {

        let foundUsers = db.users

        if (name) {
            foundUsers = foundUsers.filter((user) => user.name.indexOf(name as string) > -1)
        }

        return foundUsers

    },
    userById(id: string) {
        const user = db.users.find((user) => user.id === +id)
        if (!user) {
            return
        }
        return user
    },
    createNewUser(name: string) {

        const newUser = {
            id: +(new Date()),
            name: name
        }
        db.users.push(newUser)

        return newUser
    },
    deleteUser(id: string) {

        const currentUser = db.users.find((user) => user.id === +id)

        if (!currentUser) {
            return
        }

        db.users = db.users.filter((user) => user.id !== +id)

        return currentUser
    },
    updateUser(id: string, newName: string) {

        const user = db.users.find((user) => user.id === +id)

        if (!user) return

        user.name = newName

        return user

    }
}