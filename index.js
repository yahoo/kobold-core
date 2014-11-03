// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var ConnectionAdapter = require('./lib/connectionAdapter/connectionAdapter');
var RiakConnectionAdapter = require('./lib/connectionAdapter/riakConnectionAdapter');

var StorageAdapter = require('./lib/storageAdapter/storageAdapter');
var FileStorageAdapter = require('./lib/storageAdapter/fileStorageAdapter');
var KeyValueStorageAdapter = require('./lib/storageAdapter/keyValueStorageAdapter');

/**
 * Exported values
 *
 * @type {object}
 */
var core = {

	/**
	 * Abstract storage adapter class
	 *
	 * @property StorageAdapter
	 * @type {StorageAdapter}
	 */
	StorageAdapter: StorageAdapter,

	/**
	 * List of storage adapters
	 *
	 * @property storageAdapters
	 * @type {object}
	 */
	storageAdapters: {
		"File": FileStorageAdapter,
		"KeyValue": KeyValueStorageAdapter
	},

	/**
	 * Builds a storage adapter
	 *
	 * @method createStorageAdapter
	 * @param {string} build
	 * @param {object} config
	 * @param {string} config.type
	 * @param {object} [config.options]
	 * @param {ConnectionAdapter} [config.connection]
	 * @return {StorageAdapter}
	 */
	buildStorageAdapter: function (build, config) {
		var type = config.type,
			adapterOptions = config.options || {},
			AdapterClass;

		if (typeof type == 'string') {
			AdapterClass = core.storageAdapters[type];
			if (config.connection) {
				adapterOptions.connection = this.createConnectionAdapter(config.connection);
			}
			return new AdapterClass(build, adapterOptions);
		} else {
			return type; // Use as instance instead
		}
	},


	/**
	 * Abstract connection adapter class
	 *
	 * @property ConnectionAdapter
	 * @type {ConnectionAdapter}
	 */
	ConnectionAdapter: ConnectionAdapter,

	/**
	 * List of connection adapters
	 *
	 * @property connectionAdapters
	 * @type {object}
	 */
	connectionAdapters: {
		"Riak": RiakConnectionAdapter
	},

	/**
	 * Builds a connection adapter
	 *
	 * @method createConnectionAdapter
	 * @param {object} config
	 * @param {string} config.type
	 * @param {object} [config.options]
	 * @return {ConnectionAdapter}
	 */
	buildConnectionAdapter: function (config) {
		var type = config.type,
			adapterOptions = config.options,
			AdapterClass;

		if (typeof type == 'string') {
			AdapterClass = core.connectionAdapters[type];
			return new AdapterClass(adapterOptions);
		} else {
			return type; // Use as instance instead
		}
	},


	/**
	 * Version of package
	 *
	 * @property version
	 * @type {string}
	 */
	version: require('./package.json').version
};
module.exports = core;
