import dbHelper from './db-helper';
import assert from 'assert';
import should from 'should';

describe('Database helper', function() {

	it('should load prebuilt DB', function() {
		return dbHelper.loadDefault('src/other/time-hero.txt').then(function() {
			return dbHelper.getById('preferences');
		}).then(function(res) {
			res.should.be.an.Object().and.have.property('username').which.equal('Best Hero');
		});
	});

	it('should destroy DB (for test)', function() {
		return dbHelper.destroy().then(function(res) {
			res.should.be.an.Object().and.have.property('ok').which.equal(true);
		});
	});

});