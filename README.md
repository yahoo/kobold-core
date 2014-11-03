Kobold-Core
===========

Core library for shared objects of the Kobold testing framework.

##Installation

Install this module with the following command:
```shell
npm install kobold-core
```

Add the module to your ```package.json``` dependencies:
```shell
npm install --save kobold-core
```
Add the module to your ```package.json``` dev-dependencies:
```shell
npm install --save-dev kobold-core
```

Require the module in your source-code:
```javascript
var core = require('kobold-core');
```

##Usage

The module exposes 2 major components:
* Storage Adapter
* Connection Adapter

###Storage Adapter

There are two storage adapter available:
* FileStorageAdapter (```file```)
* KeyValueStorageAdapter (```KeyValue```)

These adapters can be accessed through the ```storageAdapters``` property:
```javascript
var FileStorageAdapter = core.storageAdapters.file;
```

A build function is available to create and configure a storage adapter:
```javascript
var storageAdapter = core.buildStorageAdapter('build1', {
	type: '...'
});
```

An abstract storage adapter is exposed to implement additional plugins:
```javascript
var StoragePlugin = core.StorageAdapter.extend({
	// Implementation
});
``` 

####File Storage Adapter

This storage adapter uses the local filesystem to manage screens.
```javascript
var fileStorageAdapter = core.buildStorageAdapter('build1', {
	type: 'File',
	options: {
		path: 'path/to/screens'
	}
});
```

####Key-Value Storage Adapter

The Key-Value storage adapter manages screens on a key-value storage system.
```javascript
var keyValueStorageAdapter = core.buildStorageAdapter('build1', {
	type: 'KeyValue',
	connection: connectionAdapter,
	options: {
		company: '<company-id>',
		department: '<department-id>',
		project: '<project-id>',
		job: '<job-id>'
	}
});
```

###Connection Adapter

Currently, only one connection adapter is available:
* RiakConnectionAdapter (```Riak```)

These adapters can be accessed through the ```connectionAdapters``` property:
```javascript
var RiakConnectionAdapter = core.connectionAdapters.Riak;
```

A build function is available to create and configure a connection adapter:
```javascript
var riakStorageAdapter = core.buildConnectionAdapter({
	type: 'Riak',
	options: {
		host: 'www.example.org'
	}
});
```

An abstract connection adapter is exposed to implement additional plugins:
```javascript
var ConnectionPlugin = core.ConnectionAdapter.extend({
	// Implementation
});
``` 

####Riak Connection Adapter

This adapter can be supplied to the Key-Value storage adapter to save the screens in a Riak grid.
```javascript
var riakStorageAdapter = core.buildConnectionAdapter({
	type: 'Riak',
	options: {
		host: 'www.example.org'
	}
});

var keyValueStorageAdapter = core.buildStorageAdapter('build1', {
	type: 'KeyValue',
	connection: riakStorageAdapter,
	options: {
		company: '<company-id>',
		department: '<department-id>',
		project: '<project-id>',
		job: '<job-id>'
	}
});
```

##API-Documentation

Generate the documentation with following command:
```shell
npm run docs
```
The documentation will be generated in the ```docs``` folder of the module root.

##Tests

Run the tests with the following command:
```shell
npm run test
```
The code-coverage will be written to the ```coverage``` folder in the module root.

##Third-party libraries

The following third-party libraries are used by this module:

###Dependencies
* pngjs-image: https://github.com/yahoo/pngjs-image
* preceptor-core: https://github.com/yahoo/preceptor-core
* promise: https://github.com/then/promise
* request: https://github.com/mikeal/request
* uuid: https://github.com/shtylman/node-uuid

###Dev-Dependencies
* chai: http://chaijs.com
* istanbul: https://github.com/gotwarlost/istanbul
* mocha: https://github.com/visionmedia/mocha
* sinon: http://cjohansen.no/sinon/
* yuidocjs: https://github.com/yui/yuidoc

##License

The MIT License

Copyright 2014 Yahoo Inc.
