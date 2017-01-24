import PouchDB from 'pouchdb';
import PouchDBLoad from 'pouchdb-load';

PouchDB.plugin(PouchDBLoad);

class DBHelper {
	constructor(pouchDB) {
		this.db = pouchDB || new PouchDB('time-hero-db');
	}

	loadDefault(path = './time-hero.txt') {
		var db = this.db;
		// This code needs refactoring. Really.
		return db.get('_local/preloaded').then(function(doc) {
			}).catch(function(err) {
				if (err.name !== 'not_found') {
					throw err;
				}

				return db.load(path).then(function() {
					return db.put({_id: '_local/preloaded'});
				});
			});
	}

	getById(id) {
		return this.db.get(id);
	}
}

export let dbHelper = new DBHelper();