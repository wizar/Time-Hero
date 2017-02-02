import {dbHelper} from '../db-helper.js';

const PREFERENCES_KEY = 'preferences';

class PreferencesRepo {
	constructor() {}

	getPreferences() {
		return dbHelper.getById('preferences');
	}

	updatePreferences(preferences) {
		return dbHelper.update(preferences);
	}
}

export let preferencesRepo = new PreferencesRepo();