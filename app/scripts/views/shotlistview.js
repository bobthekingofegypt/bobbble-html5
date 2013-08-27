/*global define, dust*/
define([
	'jquery',
    'underscore',
	'backbone',
    'dust'
], function ($, _, Backbone) {
	'use strict';

    var ShotListView = Backbone.View.extend({

        initialize: function () {
            this.containers = {};

            var placeHolderElement = {
                shot_id: 0,
            };
            this.internalList = _(30).times(function() {
                return placeHolderElement;
            });

            var callback = _.bind(this.scroll, this);
            this.holder = document.querySelector('#view-home section');
            this.holder.addEventListener('touchmove', callback, false);
            this.holder.addEventListener('scroll', callback, false);
            
            this.render();

            var self = this;
            this.model.fetch({
                success: function() {
                    self.renderAgain(self.model.page);
                }
            });
        },

        render: function () {
            var container = document.createElement("div");

            var self = this;
            dust.render("test",{ shots : this.internalList}, function(err, out) {
                container.innerHTML = out;
            });

            this.$el.append(container);
            this.containers[this.model.page.toString()] = container;
        
            return this;
        },

        renderAgain: function(page) {
            var container = this.containers[page];

            $(container).empty();

            var models = this.model.toJSON();
            var shots = [];
            for (var i=(page-1)*30; i<(page*30); ++i) {
                var model = models[i];
                var imageUrl = encodeURIComponent(model.image_teaser_url);
                var newImageUrl = "http://192.168.1.78:8080/server-core-0.1-SNAPSHOT/?url="+imageUrl+"&width=279&height=211&maintainAspectRatio=true&type=png";

                shots.push({ 
                    shot_id: model.id,
                    image_url: newImageUrl,
                    name: model.player.name
                });
            }

            var self = this;
            dust.render("test",{ shots : shots}, function(err, out) {
                container.innerHTML = out;
            });
        },

        loadMore: function () {
            var page = this.model.page;
            var self = this;
            this.model.fetch({ 
                remove: false,
                success: function() {
                    self.renderAgain(page);
                }
            });
        },

        scroll: function(event) {
            var top = this.holder.scrollTop;
            if (top > (this.holder.scrollHeight - 
                       this.holder.clientHeight - 
                       (this.holder.clientHeight*1.5))) {
                this.model.page = this.model.page + 1;
                this.render();
                this.loadMore();
            }
        }

    });

    return ShotListView;

});

