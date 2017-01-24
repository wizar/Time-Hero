import PouchDB from 'pouchdb';
import memdown from 'memdown';
import {dbHelper} from '../src/js/db-helper';
import assert from 'assert';

describe('Database helper', function() {

	it('initialize empty db', function() {
		// var inMemoryDB = new PouchDB('test', {db: memdown});
		// dbHelper = new DBHelper(inMemoryDB);
	});

	it('load prebuilt DB', function() {
		dbHelper.loadDefault('other/time-hero.txt').then(function() {
			return dbHelper.getById('preferences');
		}).then(function(res) {
			assert.equal(res.username, 'Best1 Hero')
		});
	});

});