import {dbHelper} from '../db-helper';
import {statsRepository} from './stats-repository';
import should from 'should';

beforeEach(function() {
  return dbHelper.loadDefault('src/other/time-hero.txt');
});

afterEach(function() {
	return dbHelper.destroy();
})

describe('Statistics repo', function() {

	it('should return sessions count', function() {
		return statsRepository.getSessionsCount().then(function(res) {
			return res.should.be.equal(0);
		});
	});

	it('should increment sessions count', function() {
		return statsRepository.incrementSessionsCount().then(function() {
			return statsRepository.getSessionsCount();
		}).then(function(res) {
			return res.should.be.equal(1);
		});
	});

	it('should decrement sessions count', function() {
		return statsRepository.incrementSessionsCount(3).then(function() {
			return statsRepository.decrementSessionsCount();
		}).then(function() {
			return statsRepository.getSessionsCount();
		}).then(function(res) {
			return res.should.be.equal(2);
		});
	});
});