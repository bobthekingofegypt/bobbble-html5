/*global define*/
define([
	'jquery',
    'underscore',
	'backbone',
	'collections/shotlist',
	'views/shotlistview',
    'transition',
    'views/shotdetailview',
    'collections/commentlist'
], function ($, _, Backbone, ShotList, ShotListView, transition, ShotDetailView, CommentList) {
	'use strict';

	var Workspace = Backbone.Router.extend({

        shotList: null,

		routes: {
			'': 'list',
            'shot/:id': 'shot'
		},

		list: function () {
            if (this.shotList) {
                transition.leftToRight('view-home', 'view-shot-details');
            }
            if (!this.shotList) {
                var shotList = new ShotList();
                $("#view-home section").html(new ShotListView({model: shotList}).el);
                this.shotList = shotList;
            }
		},

        shot: function(id) {
            id = parseInt(id, 10);

            if (this.shotList) {
                document.querySelector('#view-shot-details section').scrollTop = 0;
                transition.rightToLeft('view-shot-details', 'view-home');

                var entry = _.find(this.shotList.models, function(shot) {
                    return shot.id === id;
                });
                var model = new Backbone.Model();
                model.set({shot: entry, comments: new CommentList({}, {id: entry.id})});
                $('#view-shot-details section').html(new ShotDetailView({model: model}).el);
            } else {
                this.navigate('', {trigger: true});
            }

        }
	});

	return Workspace;
});
