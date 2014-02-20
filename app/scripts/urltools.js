/*global define, window*/
define([
], function () {
	'use strict';

    var resizedImageUrl = function(url, width, height) {
        var encodedUrl = window.encodeURIComponent(url);

        return "http://109.74.204.113:8080/bobbble-resizer/?url="+
            encodedUrl + "&width=" + width + "&height=" + height +
            "&maintainAspectRatio=true&type=png";
    };

    return resizedImageUrl;
});
