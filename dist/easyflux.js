/**
 * Easyflux with mixins for React.js
 * Another iteration over the super-complicated Facebook`s Flux flow
 * Version 0.1.4
 * Build at: 07-04-2015
 */
/**
 * Defines the register method for a generic, AMD and require modules definition
 */
var __register = (function(window) {
    return function(moduleName, definition){
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
}(this['window'] || this));
__register('Easyflux',
    (function(window){
        "use strict";

        /**
         * Creates buckets of events passed in as array
         * Easier to namespace events
         * @type {Function}
         */
        var module = function (bucket) {
            var bundle;

            if (bucket && bucket.length) {

                bundle = {};

                for (var i = 0; i < bucket.length; i++) {
                    bundle[bucket[i]] = {};

                    (function(){

                        bundle[bucket[i]] = {

                            /**
                             * Event ID
                             */
                            NAME: bucket[i],

                            /**
                             * Event trigger method
                             * @param [values] []
                             */
                            trigger: function() {
                                var args = Array.prototype.slice.apply(arguments);

                                // Clean way of grabbing params
                                this.callbacks = this.callbacks || [];

                                for (var i = 0; i < this.callbacks.length; i++) {
                                    this.callbacks[i].callback.apply(this.callbacks[i].scope, args);
                                }

                            },

                            /**
                             * Listener method
                             * @param callback {Function}
                             * @param scope {React.component|*}
                             */
                            listen: function(callback, scope) {
                                this.callbacks = this.callbacks || [];
                                this.callbacks.push({
                                    callback: callback,
                                    scope: scope
                                });
                            },

                            /**
                             * Remove listener for this event at this scope
                             * @param scope {*}
                             */
                            remove: function(scope) {
                                for (var i = 0; i < this.callbacks.length; i++) {
                                    if (this.callbacks[i].scope === scope) {
                                        break;
                                    }
                                }

                                this.callbacks.splice(i, 1);
                            }

                        };

                    }());
                }
            }

            return bundle;
        };

        module.Mixin = {
            /**
             * Holds the references for events to unmount when components unmounts
             * @private
             */
            _toUnmout: [],

            /**
             * General listener method
             * @param eventObj
             * @param callback
             * @param scope
             */
            listenTo: function(eventObj, callback, scope) {

                // Grab the eventObj from context.events
                if (typeof eventObj === 'string') {
                    eventObj = this.events[eventObj];
                }

                eventObj.listen(callback, scope);

                this._toUnmout.push({
                    eventObj: eventObj,
                    scope: scope
                });
            },

            /**
             * Triggers a certain event
             * @param eventObj {*}
             * @param [values] []
             */
            trigger: function(eventObj) {
                var args = Array.prototype.slice.apply(arguments);
                args.shift();

                // Grab the eventObj from context.events
                if (typeof eventObj === 'string') {
                    eventObj = this.events[eventObj];
                }

                eventObj.trigger.apply(eventObj, args);

                if (window['React'] && this.props.events && this.props.events[eventObj.NAME]) {
                    this.props.events[eventObj.NAME].apply(eventObj, args);
                }
            },

            /**
             * Overrides the default handler for unmounting components
             * @override
             */
            componentWillUnmount: function() {
                for (var i = 0; i < this._toUnmout.length; i++) {
                    this._toUnmout[i].eventObj.remove(this);
                }
            },

            /**
             * Takes care for shorthand event definition
             * @override
             */
            componentWillMount: function() {
                var events = this.events,
                    callbacks = {},
                    eventId, i = 0;

                if (events.length) {
                    this.events = module(this.events);
                } else if (typeof events['length'] == 'undefined' && typeof events === 'object') {
                    events = [];

                    // Grab the eventIds and callbacks
                    for (eventId in this.events) {
                        events.push(eventId);
                        callbacks[eventId] = this.events[eventId];
                    }

                    // Define the event bucket
                    this.events = module(events);

                    // Assign the callbacks to the events
                    for (i = 0; i < events.length; i++) {
                        this.listenTo(events[i], this[callbacks[events[i]]], this);
                    }
                }
            }
        };

        return module;

    }(this['window'] || this))
);
