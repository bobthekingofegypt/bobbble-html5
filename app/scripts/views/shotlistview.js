/*global define*/
define([
	'jquery',
    'underscore',
	'backbone',
    'dust'
], function ($, _, Backbone, dust) {
	'use strict';

    var ShotListView = Backbone.View.extend({

        initialize: function () {
            this.render();
        },

        render: function () {

            var models = this.model.toJSON();
            var shots = _.map(models, function(model) {
                var imageUrl = encodeURIComponent(model.image_teaser_url);
                var newImageUrl = "http://192.168.1.78:8080/server-core-0.1-SNAPSHOT/?url="+imageUrl+"&width=279&height=211&maintainAspectRatio=true&type=png";
                console.log(newImageUrl);

                return { 
                    shot_id: model.id,
                    image_url: newImageUrl,
                    name: model.player.name
                }
            });

            var self = this;
            dust.render("test",{ shots : shots },
                 function(err, out) {
                     self.$el.html(out);
                 });
        
            return this;
        }
    });

	return ShotListView;
});

