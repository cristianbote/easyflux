var InstanceWithMixin = (function() {

    var ClassFunc = function(type) {
        switch(type) {
            case 'array':
                this.events = ['change'];
                this.componentWillMount();
                break;

            case 'object':
                this.events = {'change': 'onChange'};
                this.componentWillMount();
                break;

            default:
                this.events = Easyflux(['change']);
                break;
        }
    };

    ClassFunc.prototype = Object.create(window.Easyflux.Mixin);
    ClassFunc.prototype.constructor = ClassFunc;

    // Dummy spy method
    ClassFunc.prototype.onChange = function() {};

    return ClassFunc;
}());