import PouchDB from 'pouchdb-browser';

class DBHelper {
	constructor(pouchDB) {
		this.db = pouchDB || new PouchDB('time-hero-db');
	}
}

export default DBHelper;