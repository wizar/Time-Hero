import PouchDB from 'pouchdb'; // Already have pouchdb-browser. Should use pouchdb and separate adapters
import memdown from 'memdown';
import DBHelper from '../src/js/db-helper';
import assert from 'assert';

describe('Database helper', function() {

	it('initialize empty db', function() {
		var inMemoryDB = new PouchDB('test', {db: memdown});
		var dbHelper = new DBHelper(inMemoryDB);
	});

});