import PouchDB from 'pouchdb-browser';

class DBHelper {
	constructor() {
		this.db = new PouchDB('time-hero-db');
	}
}

export default DBHelper;