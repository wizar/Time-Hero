import PouchDB from 'pouchdb-browser';
import PouchDBLoad from 'pouchdb-load';
import fs from 'fs';

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

				// Cannot figure out how to make right URI for test
				var dump = '' + fs.readFileSync(path);

				return db.load(dump).then(function() {
					return db.put({_id: '_local/preloaded'});
				});
			});
	}

	getById(id) {
		return this.db.get(id);
	}

	update(doc) {
		return this.db.put(doc);
	}
}

export let dbHelper = new DBHelper();