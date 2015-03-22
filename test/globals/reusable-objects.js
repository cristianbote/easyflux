var InstanceWithMixin = (function() {

    var ClassFunc = function() {
        this.events = Easyflux(['change']);
    };

    ClassFunc.prototype = Object.create(window.Easyflux.Mixin);
    ClassFunc.prototype.constructor = ClassFunc;

    return ClassFunc;
}());