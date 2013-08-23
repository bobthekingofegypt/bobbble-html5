/*global define, dust*/
define([
	'jquery',
    'underscore',
	'backbone',
    'dust'
], function ($, _, Backbone) {
	'use strict';

    var ShotDetailView = Backbone.View.extend({
        
        initialize: function () {
            var self = this;
            this.model.get('comments').fetch({success: function() {
                console.log("banana");
                self.render();
            }});
            this.render();
        },

        render: function () {

            var model = this.model.get('shot').toJSON();

            var self = this;
            dust.render("details",{ shot : model }, function(err, out) {
                self.$el.html(out);
            });

            var comments = this.model.get('comments').toJSON();
            dust.render("comments",{ comments : comments}, function(err, out) {
                $('#comments').html(out);
            });
        
            return this;
        }

        

    });

    return ShotDetailView;
});

