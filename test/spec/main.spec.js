(function() {
    "use strict";

    var Easyflux = window.Easyflux,
        assert = chai.assert;

    // Main test suite
    describe('Main', function() {
        // Regression
        it('should have instance and proper type', function() {
            assert.isDefined(Easyflux);
            assert.isFunction(Easyflux);
        });

        // Get a simple events bucket
        it('should have a bucket with events', function() {
            var bucket = Easyflux(['change']);
            assert.isObject(bucket);
            assert.property(bucket, 'change');
        });

        // Check proper signature of event object
        it('event should have proper spec', function() {
            var bucket = Easyflux(['change']);
            assert.isObject(bucket.change);

            // Prototype assertion
            assert.property(bucket.change, 'listen');
            assert.isFunction(bucket.change.listen);

            assert.property(bucket.change, 'trigger');
            assert.isFunction(bucket.change.trigger);

            assert.property(bucket.change, 'remove');
            assert.isFunction(bucket.change.remove);

            assert.property(bucket.change, 'NAME');
            assert.isString(bucket.change.NAME);
        });
    });
}());