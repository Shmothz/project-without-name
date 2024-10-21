import db from '../../db.json'
import {ChangeSettingsModel} from '../../models/settings/ChangeSettingsModel'

export const settingsRep = {
    getSettings() {
        return db.settings
    },
    updateSettings(newSettings: ChangeSettingsModel) {
        db.settings = newSettings
        return db.settings
    }
}