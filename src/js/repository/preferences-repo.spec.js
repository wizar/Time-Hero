import {dbHelper} from '../db-helper';
import {preferencesRepo} from './preferences-repo.js';
import assert from 'assert';
import should from 'should';

beforeEach(function() {
  return dbHelper.loadDefault('src/other/time-hero.txt');
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
		});
	});
});