(function() {
    "use strict";

    var EasyfluxMixin = Easyflux.Mixin,
        assert = chai.assert;

    // Mixin test suite
    describe('Mixin', function() {

        // Let's make sure we have proper type
        it('should have proper type', function() {
            assert.isObject(EasyfluxMixin);
        });

        // Also the prototype has not changed
        it('should have proper blueprint', function() {
            assert.property(EasyfluxMixin, 'listenTo');
            assert.property(EasyfluxMixin, 'trigger');
            assert.property(EasyfluxMixin, 'componentWillUnmount');
        });

        // Also the prototype has not changed
        it('should have event', function() {
            var dummy = new InstanceWithMixin();
            assert.property(dummy, 'events');
        });
    });
}());