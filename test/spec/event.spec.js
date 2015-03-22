(function() {
    "use strict";

    var Easyflux = window.Easyflux,
        assert = chai.assert;

    // Event func test suite
    describe('Event', function() {
        var bucket = Easyflux(['change']),
            instance = {
                onChange: sinon.spy()
            };

        // Register listener for change
        it('should have a listener registered', function() {
            bucket.change.listen(instance.onChange, instance);
            assert.property(bucket.change, 'callbacks');
            assert.isArray(bucket.change.callbacks);
            assert.equal(bucket.change.callbacks.length, 1);
            assert.isObject(bucket.change.callbacks[0]);
            assert.isFunction(bucket.change.callbacks[0].callback);
        });

        // Trigger the event
        it('should trigger the event', function() {
            // Straight trigger
            bucket.change.trigger();
            assert.isTrue(instance.onChange.calledOnce);

            // Multiple args trigger
            bucket.change.trigger(0, 1, 2, 3);
            assert.isTrue(instance.onChange.calledWith(0, 1, 2, 3));
            assert.isTrue(instance.onChange.calledTwice);
        });

        // Should not remove it
        it('should not remove the event with wrong scope', function() {
            bucket.change.remove(this);
            assert.property(bucket, 'change');
        });

        // Remove it
        it('should remove the event', function() {
            bucket.change.remove(instance);
            assert.equal(bucket.change.callbacks.length, 0);
        });
    });
}());