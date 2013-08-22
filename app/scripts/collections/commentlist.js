/*global define*/
define([
	'underscore',
	'backbone',
	'models/comment'
], function (_, Backbone, Comment) {
	'use strict';

	var CommentList = Backbone.Collection.extend({

		model: Comment,

        initialize: function(models, options) {
            this.id = options.id;
        },
        
        url: function() {
            return 'http://api.dribbble.com/shots/'+this.id+'/comments?per_page=30';
        },

        parse: function(resp) {
            return resp.comments;
        },

        sync: function(method, model, options) {
            options = options || {};
            options.dataType = "jsonp"; 
            return Backbone.sync(method, model, options);
        }
	});

	return CommentList;
});
