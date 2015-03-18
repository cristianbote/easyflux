(function() {
    "use strict";

    var Easyflux = window.Easyflux,
        EasyfluxMixin = window.Easyflux.Mixin,
        assert = chai.assert,
        getDummyObject = function() {
            var dummy = Object.create(EasyfluxMixin);
            dummy.events = Easyflux(['change']);
        };

    // Mixin test suite
    xdescribe('Mixin', function() {

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
        xit('should have change event', function() {
            var dummy = getDummyObject();

            assert.property(dummy, 'events');
        });
    });
}());