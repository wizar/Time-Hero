import dbHelper from '../db-helper';
import {StatsRepo} from './stats-repository';
import should from 'should';

beforeEach(function() {
  return dbHelper.loadDefault('src/other/time-hero.txt');
});

afterEach(function() {
	return dbHelper.destroy();
})

describe('Statistics repo', function() {

	it('should return sessions count', function() {
		return StatsRepo.getSessionsCount().then(function(res) {
			return res.should.be.equal(0);
		});
	});

	it('should increment sessions count', function() {
		return StatsRepo.incrementSessionsCount().then(function() {
			return StatsRepo.getSessionsCount();
		}).then(function(res) {
			return res.should.be.equal(1);
		});
	});

	it('should decrement sessions count', function() {
		return StatsRepo.incrementSessionsCount(3).then(function() {
			return StatsRepo.decrementSessionsCount();
		}).then(function() {
			return StatsRepo.getSessionsCount();
		}).then(function(res) {
			return res.should.be.equal(2);
		});
	});
});