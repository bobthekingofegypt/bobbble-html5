/*global define*/
define([
	'underscore',
	'backbone',
	'models/shot'
], function (_, Backbone, Shot) {
	'use strict';

	var ShotList = Backbone.Collection.extend({

		model: Shot,

        page: 1,

        url: function() {
            return "http://api.dribbble.com/shots/?per_page=30&page=" + this.page
        },
        //url: "http://api.dribbble.com/shots/?per_page=30",
    
        parse: function(resp) {
            return resp.shots;
        },

        sync: function(method, model, options) {
            options = options || {};
            options.dataType = "jsonp"; 
            return Backbone.sync(method, model, options);
        }
	});

	return ShotList;
});
