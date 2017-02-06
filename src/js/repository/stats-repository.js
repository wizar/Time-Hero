import { dbHelper } from '../db-helper.js';

const STATS_KEY = 'statistics';

class StatsRepo {
  constructor() {}

  getSessionsCount() {
    return dbHelper.getById(STATS_KEY).then(res => res.sessionsCount);
  }

  incrementSessionsCount(value = 1) {
    return dbHelper.getById(STATS_KEY).then((res) => {
      res.sessionsCount += value;
      return dbHelper.update(res);
    });
  }

  decrementSessionsCount(value = 1) {
    return dbHelper.getById(STATS_KEY).then((res) => {
      res.sessionsCount -= value;
      return dbHelper.update(res);
    });
  }
}

export const statsRepository = new StatsRepo();
