/*global define*/
define([
	'jquery',
    'underscore',
	'backbone',
    'dust'
], function ($, _, Backbone, dust) {
	'use strict';

    var ShotDetailView = Backbone.View.extend({
        
        initialize: function (options) {
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
            dust.render("details",{ shot : model },
                 function(err, out) {
                     self.$el.html(out);
            });

            var model = this.model.get('comments').toJSON();
            dust.render("comments",{ comments : model },
                 function(err, out) {
                     $('#comments').html(out);
            });
        
            return this;
        }

        

    });

    return ShotDetailView;
});

