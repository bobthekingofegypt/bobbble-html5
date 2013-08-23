/*global define*/
define([
], function () {
	'use strict';

    var slideWise = {
        rtl: ['slide-out-to-left', 'slide-in-from-right'],
        ltr: ['slide-out-to-right', 'slide-in-from-left']
    };
    
    var slide = function(opts){
        var inEl = opts['in'],
            outEl = opts.out,
            inClass = inEl.classList,
            outClass = outEl.classList,
            inHeader = inEl.getElementsByTagName('header')[0],
            outHeader = outEl.getElementsByTagName('header')[0],
            inHeaderClass = inHeader.classList,
            outHeaderClass = outHeader.classList,
            direction = opts.direction,
            fn = opts.fn,
            wise = slideWise[direction],
            reset = function(){
                outClass.add('hidden');
                inEl.removeEventListener('webkitAnimationEnd', reset, false);
                outClass.remove('sliding');
                inClass.remove('sliding');
                outClass.remove(wise[0]);
                inClass.remove(wise[1]);
                inHeaderClass.remove('transparent');
                outHeaderClass.remove('transparent');
                if (fn) {
                    fn.apply();
                }
            };
        inClass.remove('hidden');
        outClass.add('sliding');
        inClass.add('sliding');
        inEl.addEventListener('webkitAnimationEnd', reset, false);
        inHeaderClass.add('transparent');
        outHeaderClass.add('transparent');
        outClass.add(wise[0]);
        inClass.add(wise[1]);
    };

	return slide;
});
