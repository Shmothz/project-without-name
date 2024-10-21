import db from '../../db.json'

export const testRep = {
    clearUsers() {
        db.users = []
    },
    clearSettings() {
        db.settings = {
            firstField: true,
            secondField: '',
            thirdField: true
        }
    }
}