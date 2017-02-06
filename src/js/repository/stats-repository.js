/* eslint no-param-reassign: ["error", { "props": false }]*/
import dbHelper from '../db-helper';

const STATS_KEY = 'statistics';

class StatsRepo {
  static getSessionsCount() {
    return dbHelper.getById(STATS_KEY).then(res => res.sessionsCount);
  }

  static incrementSessionsCount(value = 1) {
    return dbHelper.getById(STATS_KEY).then((res) => {
      res.sessionsCount += value;
      return dbHelper.update(res);
    });
  }

  static decrementSessionsCount(value = 1) {
    return dbHelper.getById(STATS_KEY).then((res) => {
      res.sessionsCount -= value;
      return dbHelper.update(res);
    });
  }
}

const statsRepository = new StatsRepo();

export default statsRepository;
