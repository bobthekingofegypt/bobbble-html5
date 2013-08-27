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
            //shotList.fetch({success: function(){
            //    $("#view-home section").html(new ShotListView({model: shotList}).el);
            //}});
            this.shotList = shotList;
            }
		},

        shot: function(id) {
            id = parseInt(id);
            console.log("TEST");
            console.log(id);

            if (this.shotList) {
                transition.rightToLeft('view-shot-details', 'view-home');

                var entry = _.find(this.shotList.models, function(shot) {
                    return shot.id === id;
                });
                var model = new Backbone.Model();
                model.set({shot: entry, comments: new CommentList({}, {id: entry.id})});
                $('#view-shot-details section').html(new ShotDetailView({model: model}).el);
            } else {
                this.navigate('', {trigger: true});
                /*
                var shotList = new ShotList();
                shotList.fetch({success: function(){
                    var entry = _.find(shotList.models, function(shot) {
                        return shot.id == id;
                    });
                    $("#content2").html(new ShotDetailView({model: entry}).el);
                }});
                this.shotList = shotList;
                */
            }

        }
	});

	return Workspace;
});
