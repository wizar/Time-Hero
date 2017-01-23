import PouchDB from 'pouchdb';

class DBHelper {
	constructor(pouchDB) {
		this.db = pouchDB || new PouchDB('time-hero-db');
	}
}

export default DBHelper;