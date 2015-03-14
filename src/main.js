(function(window, moduleName){
    "use strict";

    /**
     * Creates buckets of events passed in as array
     * Easier to namespace events
     * @type {Function}
     */
    var module = window[moduleName] = function (bucket) {
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

                        }.bind(bundle[bucket[i]]),

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
                        }.bind(bundle[bucket[i]]),

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
                        }.bind(bundle[bucket[i]])

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
         * General listener method`
         * @param eventObj
         * @param callback
         * @param scope
         */
        listenTo: function(eventObj, callback, scope) {
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
            eventObj.trigger.apply(eventObj, args);
        },

        /**
         * Overrides the default handler for unmounting components
         * @override
         */
        componentWillUnmount: function() {
            for (var i = 0; i < this._toUnmout.length; i++) {
                this._toUnmout[i].eventObj.remove(this);
            }
        }
    };

}(window, 'Easyflux'));