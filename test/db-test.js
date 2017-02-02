import {dbHelper} from '../src/js/db-helper';
import {preferencesRepo} from '../src/js/repository/preferences-repo.js';
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

});

describe('Preferences repo', function() {
	it('should load preferences', function() {
		return preferencesRepo.getPreferences().then(function(prefs) {
			prefs.should.be.and.Object().and.have.property('username').which.equal('Best Hero');
		});
	});

	it('should save preferences', function() {
		return preferencesRepo.getPreferences().then(function(prefs) {
			prefs.username = 'Very Best Hero';
			return preferencesRepo.updatePreferences(prefs);
		}).then(function(res) {
			res.ok.should.be.true();
		})
	});
});