/*global define*/
define([
	'jquery',
	'backbone',
	'collections/shotlist',
	'views/shotlistview',
    'transition'
], function ($, Backbone, ShotList, ShotListView, transition) {
	'use strict';

	var Workspace = Backbone.Router.extend({
		routes: {
			'': 'list',
            'shot/:id': 'shot'
		},

		list: function (param) {
            var shotList = new ShotList();
            shotList.fetch({success: function(){
                $("#content").html(new ShotListView({model: shotList}).el);
            }});
		},

        shot: function(id) {
            console.log("TEST");
            console.log(id);

            transition({
		        'in': document.getElementById('view-shot-details'),
			    out: document.getElementById('view-home'),
			    direction: 'rtl'
		    });
        }
	});

	return Workspace;
});
