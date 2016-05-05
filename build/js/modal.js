/// <reference path="../../typings/browser/ambient/jquery/index.d.ts" />
var Modalify = (function () {
    function Modalify(options) {
        this.options = options;
    }
    Modalify.prototype.doSomething = function () {
        console.log(this.options);
    };
    return Modalify;
}());
$.fn.modalify = Modalify;
