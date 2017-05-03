define(function() {
	'use strict';

	/* Convert a single or array of resources into "URI1\nURI2\nURI3..." */
	return {
		read: function(str /*, opts */) {
			return str.split('\n');
		},
		write: function(obj /*, opts */) {
			// If this is an Array, extract the self URI and then join using a newline
			if (obj instanceof Array) {
				return obj.map(function(resource) {
					console.log('urlListCOnvertor>>>>>>>>>>>>>>>>>>');
					console.log(resource);
					console.log(resource._links.self.href);
					console.log('urlListCOnvertor>>>>>>>>>>>>>>>>>>2');
					return resource._links.self.href;
				}).join('\n');
			} else { // otherwise, just return the self URI
				return obj._links.self.href;
			}
		}
	};

});