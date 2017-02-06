import dbHelper from '../db-helper';

const PREFERENCES_KEY = 'preferences';

class PreferencesRepo {
  static getPreferences() {
    return dbHelper.getById(PREFERENCES_KEY);
  }

  static updatePreferences(preferences) {
    return dbHelper.update(preferences);
  }
}

const preferencesRepo = new PreferencesRepo();

export default preferencesRepo;
