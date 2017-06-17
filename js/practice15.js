'use strict';
console.log('-----------Part #1-------------');

function x(str) {
    console.log(str);
}
function delay(f, ms) {
    return function (arg) {
        var delayThis = this;
        setTimeout(function () {
            f.call(delayThis, arg);
        }, ms)
    }
}
var x100 = delay(x, 100);
var x250 = delay(x, 250);

x100(15);
x250('Luke, im your father!');

setTimeout(function () { // timeout for right view in console

    console.log('-----------Part #2-------------');

    var f = function (a) {
        console.log(a)
    };

    function debounce(f, ms) {
        var debCount = 0;
        return function () {
            if (debCount > 0) return;
            f.apply(this, arguments);
            debCount++;
            setTimeout(function () {
                debCount = 0;
                // console.log('available');
            }, ms);
        }
    }

    var f100 = debounce(f, 100);
    f100(7);
    f100(2);
    setTimeout(function () {
        f100(3);
    }, 101);

}, 300);

setTimeout(function () { // timeout for right view in console

    console.log('-----------Part #3-------------');

    var x = function (a) {
        console.log(a)
    };

    function throttle(f, ms) {
        var saveArgs, saveThis;
        var cooldawn = false;
        return function wrapper() {

            if (cooldawn) {
                saveThis = this;
                saveArgs = arguments;
                return;
            }
            if(!saveArgs){
                f.apply(this,arguments);
            }
            if(saveArgs){
                f.apply(saveThis, saveArgs);
                saveArgs = saveThis = null;
            }

            cooldawn = true;
            setTimeout(function () {
               cooldawn = false;
                // console.log('cooldawn');
               if (saveArgs){
                   wrapper()
               }
            }, ms);
        }
    }

    var x300 = throttle(x, 1000);
    x300(1);
    x300(2);
    x300(3);
    setTimeout(function(){x300(4)}, 1010);
    x300(5);
    x300(6);

}, 1000);

