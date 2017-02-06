import PouchDB from 'pouchdb-browser';
import PouchDBLoad from 'pouchdb-load';
import fs from 'fs';

PouchDB.plugin(PouchDBLoad);

class DBHelper {
  constructor(pouchDB) {
    this.db = pouchDB || new PouchDB('time-hero-db');
  }

  loadDefault(path = './time-hero.txt') {
    const db = this.db;
    // This code needs refactoring. Really.
    return db.get('_local/preloaded').then(() => {
    }).catch((err) => {
      if (err.name !== 'not_found') {
        throw err;
      }

      // Cannot figure out how to make right URI for test
      const dump = `${fs.readFileSync(path)}`;

      return db.load(dump).then(() => db.put({ _id: '_local/preloaded' }));
    });
  }

  getById(id) {
    return this.db.get(id);
  }

  update(doc) {
    return this.db.put(doc);
  }

  destroy() {
    return this.db.destroy().then((res) => {
      this.db = new PouchDB('time-hero-db');
      return res; // Should be there some more good way?
    });
  }
}

const dbHelper = new DBHelper();

export default dbHelper;
