/**
 * Defines the register method for a generic, AMD and require modules definition
 */
var __register = function(moduleName, definition){
    "use strict";

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            window.exports = module.exports = definition;
        }
        exports[moduleName] = definition;
    } else {
        if (typeof define !== 'undefined') {
            define(moduleName, function() {
                return definition;
            });
        } else {
            window[moduleName] = definition;
        }
    }
};