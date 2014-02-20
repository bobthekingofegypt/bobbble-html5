/*global require*/

require.config({
    deps: ['main', 'dust', 'jquery'],
    shim: {
        main: {
            deps: ['jquery', 'dust']
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        views: {
            deps: ['dust']
        },
        dust: {
            exports: 'dust'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        dust: '../bower_components/dustjs-linkedin/dist/dust-core-2.0.2',
        bootstrap: 'vendor/bootstrap',
        tappable: 'vendor/tappable'
    }
});

require([
    'backbone',
    'routers/router',
    'dust',
    'underscore',
    'transition',
    'views'
], function (Backbone, Workspace) {
    'use strict';
    new Workspace();
    Backbone.history.start();

    var w = window;
    var d = document;
    var body = d.body;
    // Some useful tips from http://24ways.org/2011/raising-the-bar-on-mobile
    var scrollTop = function(){
        body.style.height = screen.height + 'px';
        setTimeout(function(){
            w.scrollTo(0, 0);
            body.style.height = w.innerHeight + 'px';
        }, 1);
    };
    if (d.readyState === 'complete'){
        scrollTop();
    } else {
        w.addEventListener('load', scrollTop, false);
    }
    document.getElementById('view-home').classList.remove('hidden');

});
