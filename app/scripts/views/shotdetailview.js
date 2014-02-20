/*global define, dust*/
define([
	'jquery',
    'underscore',
	'backbone',
    'tappable',
    'dust'
], function ($, _, Backbone) {
	'use strict';

    var ShotDetailView = Backbone.View.extend({
        
        initialize: function () {
            var self = this;
            this.model.get('comments').fetch({
                success: function() {
                    self.renderComments();
                }
            });

            this.render();
        },

        render: function () {
            var model = this.model.get('shot').toJSON();

            var self = this;
            dust.render("details",{ shot : model }, function(err, out) {
                self.$el.html(out);
            });
        
            return this;
        },

        renderComments: function() {
            var comments = this.model.get('comments').toJSON();
            dust.render("comments",{ comments : comments}, function(err, out) {
                $('#comments').html(out);
            });
        }

    });

    return ShotDetailView;
});

