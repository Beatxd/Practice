'use strict';
console.log('-----------Part #1-------------');
var head = {
    glasses: 1
};
var table = {
    __proto__: head,
    pen: 3
};
var bed = {
    __proto__: table,
    sheet: 1,
    pillow: 2
};
var pockets = Object.create(bed);
pockets.money = 2000;

console.log(pockets.glasses);
console.log(bed.glasses);
console.log(table.money);
console.log(pockets.money);

if (!Object.create) {
    Object.create = function (proto) {
        function Empty() {
        }

        Empty.prototype = proto;
        return new Empty();
    }
}

function Menu(options) {
    options = Object.create(options);
    options.width = options.width || 300;
}

console.log('-----------Part #2-------------');

Object.prototype.each = function (func) {
    for (var key in this) {
        if (!this.hasOwnProperty(key)) continue;
        var value = this[key];
        func.call(key, key, value);
    }
};


var user = {
    name: 'Smith',
    age: 30
};
user.each(function (prop, val) {
    console.log(prop + ': ' + val);
});

console.log('-----------Part #3-------------');

Function.prototype.defer = function (ms, optionalArgs) {
    var args = Array.prototype.slice.call(arguments, 1);
    var saveThis = this;
    setTimeout(function () {
        saveThis.apply(null, args);
    }, ms);
};

function f(a, b) {
    console.log(a + b);
}
// f.defer(500, 2, 3);


