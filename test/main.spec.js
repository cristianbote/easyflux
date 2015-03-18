(function() {
    "use strict";

    var Easyflux = window.Easyflux,
        assert = chai.assert;

    // Main test suite
    describe.only('Main', function() {

        // Regression
        it('should have instance and proper type', function() {
            assert.isDefined(Easyflux);
            assert.isFunction(Easyflux);
        });

        // Get a simple events bucket
        it('should have a bucket with events', function() {
            var bucket = Easyflux(['change']);

            assert.isObject(bucket);
        });
    });
}());