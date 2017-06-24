'use strict';
function Clock(options) {
    this._template = options.template;
    this._run = false;
}
Clock.prototype._render = function () {
    var date = new Date();

    var hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    var min = date.getMinutes();
    if (min < 10) min = '0' + min;

    var sec = date.getSeconds();
    if (sec < 10) sec = '0' + sec;

    var output = this._template.replace('h', hours).replace('m', min).replace('s', sec);

    console.log(output);
};
Clock.prototype.start = function () {
    var saveThis = this;
    if (this._run) throw new Error('clock was already started');
    this._run = true;
    this._render();
    this._timer = setInterval(function () {
        saveThis._render()
    }, 1000);
};
Clock.prototype.stop = function () {
    clearInterval(this._timer);
    this._run = false;
};

var clock = new Clock({
    template: 'h:m:s'
});
// clock.start();
// clock.stop();

// -------------Second part-------------
if (!Object.create) {
    Object.create = function (proto) {
        function Empty() {
        }

        Empty.prototype = proto;
        return new Empty();
    }
}

function ClockExtended(options) {
    Clock.apply(this, arguments);
    this._precision = +options.precision || 1000;
}

ClockExtended.prototype = Object.create(Clock.prototype);
ClockExtended.prototype.constructor = ClockExtended;

ClockExtended.prototype.start = function () {
    var saveThis = this;
    if (this._run) throw new Error('clock was already started');
    this._run = true;
    this._render();
    this._timer = setInterval(function () {
        saveThis._render();
    }, this._precision);
};

var clockExt = new ClockExtended({
    template: 'h:m:s',
    precision: 3000
});
clockExt.start();