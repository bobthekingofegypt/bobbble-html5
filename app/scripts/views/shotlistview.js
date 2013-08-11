/*global define*/
define([
	'jquery',
    'underscore',
	'backbone',
    'views',
    'dust'
], function ($, _, Backbone, views, dust) {
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
                    image_url: newImageUrl,
                    name: model.player.name
                }
            });

            var self = this;
            dust.render("app/scripts/templates/test",{ shots : shots },
                 function(err, out) {
                     self.$el.html(out);
                 });
        
                 /*
            _.each(this.model.models, function(model) {
                var json = model.toJSON();
                console.log(json);
                var img = $('<img height="200" id="dynamic">'); //Equivalent: $(document.createElement('img'))
                img.attr('src', json.image_teaser_url);
                img.appendTo('#imagediv');
                $(this.el).append(img);
                //var self = this;
                //dust.render("app/scripts/templates/test",this.model.toJSON(),function(err,out){
                //    $(self.el).html(out);
                //});

            }, this);
            */
            return this;
        }
    });

	return ShotListView;
});

