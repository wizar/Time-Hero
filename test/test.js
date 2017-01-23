// var Application = require('spectron').Application;
// var electron = require('electron');
// var assert = require('assert');

import {Application} from 'spectron';
import electron from 'electron';
import assert from 'assert';

describe('application launch', function () {
	this.timeout(10000)

	beforeEach(function () {
		this.app = new Application({
			path: electron,
			args: ['./']
		});
		return this.app.start();
	});

	afterEach(function () {
		if (this.app && this.app.isRunning()) {
			return this.app.stop();
		}
	});

	it('shows an initial window', function () {
		return this.app.client.getWindowCount().then(function (count) {
			assert.equal(count, 1);
		});
	});
});