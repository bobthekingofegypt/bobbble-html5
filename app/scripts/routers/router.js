/*global define*/
define([
	'jquery',
	'backbone',
	'collections/shotlist',
	'views/shotlistview'
], function ($, Backbone, ShotList, ShotListView) {
	'use strict';

	var Workspace = Backbone.Router.extend({
		routes: {
			'': 'list'
		},

		list: function (param) {
            var shotList = new ShotList();
            shotList.fetch({success: function(){
                $("#content").html(new ShotListView({model: shotList}).el);
            }});
		}
	});

	return Workspace;
});
