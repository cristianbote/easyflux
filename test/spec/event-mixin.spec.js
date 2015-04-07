(function() {
    "use strict";

    var Easyflux = window.Easyflux,
        assert = chai.assert;

    // Event with Mixin func test suite
    describe('Event Mixin, normal', function() {
        var instance = new InstanceWithMixin();

        instance.onChange = sinon.spy();

        // Make sure signature is there
        it('instance have proper signature', function() {
            assert.property(instance, 'listenTo');
            assert.property(instance, 'trigger');
            assert.property(instance, 'componentWillUnmount');
            assert.property(instance, 'componentWillMount');
            assert.property(instance, 'events');
        });

        // Listen to event
        it('listen to event', function() {
            instance.listenTo('change', instance.onChange, instance);
            assert.isTrue(instance.onChange.callCount === 0);
        });

        // Trigger it
        it('trigger', function() {
            // Simple trigger
            instance.trigger('change');
            assert.isTrue(instance.onChange.calledOnce);

            // Multiple args trigger
            instance.trigger('change', 0, 1, 2, 3);
            assert.isTrue(instance.onChange.calledWith(0, 1, 2, 3));
            assert.isTrue(instance.onChange.calledTwice);
        });

        // Remove it
        it('remove it at componentWillUnmount', function() {
            instance.componentWillUnmount();

            // Make sure is removed from callbacks
            assert.isTrue(instance.events.change.callbacks.length === 0);

            // Make sure it does not trigger anymore
            instance.trigger('change');
            assert.isFalse(instance.onChange.calledThrice);
        });
    });

    // Event with Mixin array mode, func test suite
    describe('Event Mixin, array', function() {
        var instance = new InstanceWithMixin('array');

        instance.onChange = sinon.spy();

        // Make sure signature is there
        it('instance have proper signature', function() {
            assert.property(instance, 'listenTo');
            assert.property(instance, 'trigger');
            assert.property(instance, 'componentWillUnmount');
            assert.property(instance, 'componentWillMount');
            assert.property(instance, 'events');
        });

        // Listen to event
        it('listen to event', function() {
            instance.listenTo('change', instance.onChange, instance);
            assert.isTrue(instance.onChange.callCount === 0);
        });

        // Trigger it
        it('trigger', function() {
            // Simple trigger
            instance.trigger('change');
            assert.isTrue(instance.onChange.calledOnce);

            // Multiple args trigger
            instance.trigger('change', 0, 1, 2, 3);
            assert.isTrue(instance.onChange.calledWith(0, 1, 2, 3));
            assert.isTrue(instance.onChange.calledTwice);
        });

        // Remove it
        it('remove it at componentWillUnmount', function() {
            instance.componentWillUnmount();

            // Make sure is removed from callbacks
            assert.isTrue(instance.events.change.callbacks.length === 0);

            // Make sure it does not trigger anymore
            instance.trigger('change');
            assert.isFalse(instance.onChange.calledThrice);
        });
    });

    // Event with Mixin object mode, func test suite
    describe('Event Mixin, object', function() {
        var instance = new InstanceWithMixin('object');

        instance.onChange = sinon.spy();

        // Make sure signature is there
        it('instance have proper signature', function() {
            assert.property(instance, 'listenTo');
            assert.property(instance, 'trigger');
            assert.property(instance, 'componentWillUnmount');
            assert.property(instance, 'componentWillMount');
            assert.property(instance, 'events');
        });

        // Listen to event
        it('listen to event', function() {
            instance.listenTo('change', instance.onChange, instance);
            assert.isTrue(instance.onChange.callCount === 0);
        });

        // Trigger it
        it('trigger', function() {
            // Simple trigger
            instance.trigger('change');
            assert.isTrue(instance.onChange.calledOnce);

            // Multiple args trigger
            instance.trigger('change', 0, 1, 2, 3);
            assert.isTrue(instance.onChange.calledWith(0, 1, 2, 3));
            assert.isTrue(instance.onChange.calledTwice);
        });

        // Remove it
        it('remove it at componentWillUnmount', function() {
            instance.componentWillUnmount();

            // Make sure is removed from callbacks
            assert.isTrue(instance.events.change.callbacks.length === 0);

            // Make sure it does not trigger anymore
            instance.trigger('change');
            assert.isFalse(instance.onChange.calledThrice);
        });
    });
}());