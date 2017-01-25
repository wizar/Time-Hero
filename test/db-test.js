import {dbHelper} from '../src/js/db-helper';
import assert from 'assert';
import should from 'should';

describe('Database helper', function() {

	it('initialize empty db', function() {
		// var inMemoryDB = new PouchDB('test', {db: memdown});
		// dbHelper = new DBHelper(inMemoryDB);
	});

	it('load prebuilt DB', function() {
		return dbHelper.loadDefault('src/other/time-hero.txt').then(function() {
			return dbHelper.getById('preferences');
		}).then(function(res) {
			res.should.be.an.Object().and.have.property('username').which.equal('Best Hero');
		});
	});

});