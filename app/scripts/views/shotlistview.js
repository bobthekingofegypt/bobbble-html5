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
            console.log(this.model.models);
            
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
            return this;
        }
    });

	return ShotListView;
});

