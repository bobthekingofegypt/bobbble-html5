/*global define, dust*/
define([
    'jquery',
    'underscore',
    'backbone',
    'tappable',
    'urltools'
], function ($, _, Backbone, tappable, resizedImageUrl) {
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
            container.id = "page" + this.model.page.toString();

            dust.render("shotlist",{ shots : this.internalList}, function(err, out) {
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
                var newImageUrl = resizedImageUrl(model.image_teaser_url, 279, 211);

                shots.push({ 
                    shot_id: model.id,
                    image_url: newImageUrl,
                    name: model.player.name
                });
            }

            dust.render("shotlist",{ shots : shots}, function(err, out) {
                container.innerHTML = out;
            });

            tappable('#page'+page+' .shot-list-entry a', {
                noScroll: true,
                noScrollDelay: 100,
                onTap: function(e, target){
                    location.hash = target.hash;
                }
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

        scroll: function() {
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

