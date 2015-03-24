## Easyflux [![Build Status](https://travis-ci.org/cristianbote/easyflux.svg?branch=master)](https://travis-ci.org/cristianbote/easyflux)
I'm well aware that at this point, the interwebs is full of solutions, for every particular issue, there is. Lately, React from Facebook emerged, and it brought a full spectrum of issues.
First there's Flux. Hard to get, use and start going. Then there was Reflux, a nice clean way of using Flux principles. Still, in my mind, something was missing: easy to use events.

I don't want to gave in an use some sort of frontend API to simply store data, and respond to changes(Flux) I need more. I need to be able to couple/decouple the events based on my needs.

Enter Easyflux.

## What is this?
Basically, creates buckets of events, that you can use. I've seen something similar in Reflux, but not powerful enough.

```javascript

    var globalEvents = Easyflux([
        'resetData',
        'login',
        'logout'
    ]);
    
    // Later in code
    // Listening for login
    globalEvents.login.listen(callbackFunction, context);
    
    // Triggering the login
    globalEvents.login.trigger(data);
```

Now, apply this to React.

## React usage
Maybe the above syntax, did not convince you, hopefully this will.

```javascript

    // Our dull, isolated component
    var MyComponent = React.createClass({
    
        events: Easyflux([
            'change'
        ]),
    
        getInitialState: function() {
            return {
                data: 'Initial data'
            }
        },
        
        componentDidMount: function() {
        
            // On change event, change the message
            this.events.change.listen(function(newData) {
                this.setState({
                    data: newData
                });
            }, this);
        },
        
        render: function() {
            return <span className="custom-text">{this.state.data}</span>
        }
    
    });
    
    [...]
    
    // Later in our App
    var App = React.createClass({
        
        componentDidMount: function() {
        
            // Change the text in our isolated component
            this.refs.statusText.events.change.trigger('App has loaded');
        },
        
        render: function() {
            return <MyComponent ref="statusText"/>
        }
    
    });
```

That line, though, it's a bit hard to write. Below, it's using the `Easyflux.Mixin`

```javascript

    // Our dull, isolated component
    var MyComponent = React.createClass({
    
        mixins: [Easyflux.Mixin],
    
        events: Easyflux([
            'change'
        ]),
    
        getInitialState: function() {
            return {
                data: 'Initial data'
            }
        },
        
        componentDidMount: function() {
        
            // On change event, change the message
            this.listenTo('change', function(newData) {
                this.setState({
                    data: newData
                });
            }, this);
        },
        
        render: function() {
            return <span className="custom-text">{this.state.data}</span>
        }
    
    });
    
    [...]
    
    // Later in our App
    var App = React.createClass({
        
        componentDidMount: function() {
        
            // Exactly, Backbone-style method prints
            this.refs.statusText.trigger('change', 'App has loaded');
        },
        
        render: function() {
            return <MyComponent ref="statusText"/>
        }
    
    });
```

## Proper scoping the events
At some point you'll end up having difficulties between listening to children events, that are scoped to their own namespace and context. Take a look at the demo.
You can pass to children an `events` object, with `'eventName': this._onEventName` defined keys. This will be triggered whenever the internal event is triggered inside
that children. Pretty useful stuff!

```javascript

    // JSX
    render: function() {
        return <MySuperReusableComponent events={{ 'change': this._onChangeEvent, 'doesSomething': this._onDoesSomething }} />
    }
    
    // JS
    render: function() {
        return React.createElement(MySuperReusableComponent, {
            events: {
                'change': this._onChangeEvent,
                'doesSomething': this._onDoesSomething
            }
        });
    }
```

## Final thoughts
This should be treated as a simple solution for multi-directional events.

## Feedback
Given that this tries to introduce a simpler way, of listening to events, any feedback is gratefully received.