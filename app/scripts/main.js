/*global require*/
'use strict';

require.config({
    shim: {
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
        dust: {
            exports: 'dust'
        },
        views: {
            deps: [
                'dust'
            ]
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        dust: '../bower_components/dustjs-linkedin/dist/dust-core-2.0.2',
        bootstrap: 'vendor/bootstrap'
    }
});

require([
    'backbone',
    'routers/router',
    'dust'
], function (Backbone, Workspace, dust) {
    new Workspace();
    Backbone.history.start();

    var w = window;
    var d = document;
    var body = d.body;
    // Some useful tips from http://24ways.org/2011/raising-the-bar-on-mobile
	var supportOrientation = typeof w.orientation != 'undefined',
		getScrollTop = function(){
			return w.pageYOffset || d.compatMode === 'CSS1Compat' && d.documentElement.scrollTop ||                 body.scrollTop || 0;
		},
		scrollTop = function(){
			body.style.height = screen.height + 'px';
			setTimeout(function(){
				w.scrollTo(0, 0);
				body.style.height = w.innerHeight + 'px';
			}, 1);
		};
    if (d.readyState == 'complete'){
        scrollTop();
    } else {
        w.addEventListener('load', scrollTop, false);
    }

});
