// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Promise = require('promise');
var utils = require('preceptor-core').utils;

var ComparisonAdapter = require('./comparisonAdapter');

/**
 * Blink-Diff comparison adapter
 *
 * @class BlinkDiffAdapter
 * @extends ComparisonAdapter
 */
var BlinkDiffAdapter = Base.extend(

	/** @lends BlinkDiffAdapter.prototype */
	{
		/**
		 * Runs the comparison
		 *
		 * @return {Promise} With {boolean} for success/failure
		 */
		run : function () {
			var options = utils.deepExtend({}, [this.getOptions()]);

			options.imageA = this.getImageA();
			options.imageB = this.getImageB();

			return new Promise(function (resolve, reject) {

				var BlinkDiff = utils.require('blink-diff'),
					instance = new BlinkDiff(options);

				instance.run(function (err, result) {
					this.setResultImage(instance._imageOutput);

					if (err) {
						reject(err);
					} else {
						resolve(instance.hasPassed(result.code));
					}
				}.bind(this));

			}.bind(this));
		}
	},

	{
		/**
		 * Type of class
		 *
		 * @property TYPE
		 * @type string
		 */
		TYPE: 'BlinkDiffAdapter'
	});

module.exports = BlinkDiffAdapter;
