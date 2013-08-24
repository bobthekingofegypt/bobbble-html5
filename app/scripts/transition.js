/*global define, document*/
define([
], function () {
	'use strict';

    var DIRECTION = {
        RIGHT_TO_LEFT: ['slide-out-to-left', 'slide-in-from-right'],
        LEFT_TO_RIGHT: ['slide-out-to-right', 'slide-in-from-left']
    };
    
    var slide = function(inId, outId, direction){
        var inElement = document.getElementById(inId);
        var outElement = document.getElementById(outId);

        var inHeader = inElement.getElementsByTagName('header')[0];
        var outHeader = outElement.getElementsByTagName('header')[0];

        var inClass = inElement.classList;
        var outClass = outElement.classList;
        var inHeaderClass = inHeader.classList;
        var outHeaderClass = outHeader.classList;
        
        var reset = function(){
            outClass.add('hidden');
            inElement.removeEventListener('webkitAnimationEnd', reset, false);
            outClass.remove('sliding');
            inClass.remove('sliding');
            outClass.remove(direction[0]);
            inClass.remove(direction[1]);
            inHeaderClass.remove('transparent');
            outHeaderClass.remove('transparent');
        };

        inClass.remove('hidden');
        inClass.add('sliding');
        inElement.addEventListener('webkitAnimationEnd', reset, false);
        inHeaderClass.add('transparent');
        inClass.add(direction[1]);
        
        outClass.add('sliding');
        outHeaderClass.add('transparent');
        outClass.add(direction[0]);
    };

    var rightToLeft = function(inId, outId) {
        slide(inId, outId, DIRECTION.RIGHT_TO_LEFT);
    };

    var leftToRight = function(inId, outId) {
        slide(inId, outId, DIRECTION.LEFT_TO_RIGHT);
    };

	return {
        rightToLeft: rightToLeft,
        leftToRight: leftToRight
    };
});
