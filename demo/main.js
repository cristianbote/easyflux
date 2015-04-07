(function(window){

    var Controller,
        Components = {};

    // Define app controller
    Controller = {

        /**
         * Initializes the app controller
         */
        initialize: function() {
            this.initEvents();
            this.render();
        },

        /**
         * Holds the item data
         */
        data: {
            "itemIdA": {
                id: 'itemIdA',
                checked: false,
                value: 'Something to do'
            }
        },

        /**
         * Here's the magic
         * Initializes the events that this 'scope' has
         */
        initEvents: function() {
            this.events = Easyflux([
                'change',
                'addItem',
                'removeItem'
            ]);

            this.events.change.listen(this.render, this);
            this.events.addItem.listen(this._onAddItem, this);
            this.events.removeItem.listen(this._onRemoveItem, this);
        },

        /**
         * Renders the React app
         */
        render: function() {
            React.render(React.createElement(Components.App, {data: this.data}), document.querySelector('.app'));
        },

        /**
         * Adds an item to our 'store'
         * @param itemModel
         * @private
         */
        _onAddItem: function(itemModel) {
            this.data[itemModel.id] = itemModel;
            this.render();
        },

        /**
         * Removes an item based on the id passed in
         * @param id
         * @private
         */
        _onRemoveItem: function(id) {
            delete this.data[id];
            this.render();
        }
    };

    // Define React components
    Components.App = React.createClass({
        displayName: 'App',

        /**
         * Returns the items that needs to be rendered
         * @returns {Array}
         * @private
         */
        _getItems: function() {
            var elements = [];

            for (var i in this.props.data) {
                elements.push(React.createElement(Components.TodoItem, {
                    model: this.props.data[i],
                    ref: this.props.data[i].id,
                    events: {
                        'toggleCheck': this._onItemCheck,
                        'remove': this._onItemRemove
                    }
                }));
                console.log(i);
            }

            return elements;
        },

        /**
         * Event handler for toggle check
         * @private
         */
        _onItemCheck: function() {
            Controller.events.change.trigger(Array.prototype.slice.apply(arguments));
        },

        /**
         * Removes the item from the list
         * @param id
         * @private
         */
        _onItemRemove: function(id) {
            Controller.events.removeItem.trigger(id);
        },

        /**
         * Returns the total numbers of items checked
         * @returns {number}
         * @private
         */
        _getCheckedItems: function() {
            var elements = 0;

            for (var i in this.props.data) {
                if (this.props.data[i].checked) {
                    elements += 1;
                }
            }

            return elements;
        },

        /**
         * Handles the submit event, when ENTER(13) key is pressed
         * @param e
         * @private
         */
        _onKeyUp: function(e) {
            if (e.keyCode === 13) {
                Controller.events.addItem.trigger({
                    id: 'item' + (Math.random() * Date.now()).toString(22).substr(0, 5),
                    value: this.refs.itemInput.getDOMNode().value,
                    checked: false
                });

                this.refs.itemInput.getDOMNode().value = '';
            }
        },

        /**
         * Renders the main app
         * @returns {*}
         */
        render: function() {
            var items = this._getItems();

            return React.DOM.div({}, [
                React.DOM.input({type: 'text', placeholder: 'Enter title', ref: 'itemInput', onKeyUp: this._onKeyUp}),
                React.DOM.ul({}, items),
                this._getCheckedItems() + ' / ' + items.length + ' issues done'
            ]);
        }
    });

    /**
     * TodoItem React Component Class
     */
    Components.TodoItem = React.createClass({
        displayName: 'TodoItem',

        /**
         * Inject the mixin
         */
        mixins: [Easyflux.Mixin],

        /**
         * Define the decoupled events, scoped just for this class
         */
        events: {
            'toggleCheck': '_ccToggle',
            'remove': '_ccRemove'
        },

        _ccToggle: function() {
            console.debug('_ccToggle');
        },

        _ccRemove: function() {
            console.debug('_ccRemove');
        },

        /**
         * Change the data on the model and trigger the change event
         * @private
         */
        _onChange: function() {
            this.props.model.checked = this.refs.checkbox.getDOMNode().checked;
            this.trigger('toggleCheck', this.props.model.checked);
        },

        /**
         * Removes an item from the list, by triggering the proper event
         * @private
         */
        _onRemoveItem: function() {
            this.trigger('remove', this.props.model.id);
        },

        /**
         * Renders the component
         * @returns {*}
         */
        render: function() {
            return React.DOM.li({}, [
                    React.DOM.label({}, [
                        React.DOM.input({type: 'checkbox', onChange: this._onChange, ref: 'checkbox'}, ''),
                        this.props.model.value
                    ]),
                    React.DOM.button({onClick: this._onRemoveItem}, 'Remove')
                ]
            )
        }
    });

    // Start the app
    Controller.initialize();

}(window));