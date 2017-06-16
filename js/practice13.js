'use strict';
console.log('-----------Part #1-------------');
var timers = {};

function timingDecorator(f, timer) {
    return function (num) {
        var start = performance.now();
        var result = f.call(this, num);

        if (!timers[timer]) timers[timer] = 0;
        timers[timer] += performance.now() - start;

        return result;
    }

}
function fibonacci(n) {
    return (n > 2) ? fibonacci(n - 1) + fibonacci(n - 2) : 1;
}

fibonacci = timingDecorator(fibonacci, 'fib1');
console.log(fibonacci(15));
console.log(fibonacci(3));
console.log(fibonacci(8));
console.log(fibonacci(15));
console.log(Math.round(timers['fib1']) + ' ms');

console.log('-----------Part #2-------------');

function work(a, b) {
}
function makeLogging(f, log) {
    return function () {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        log.push(args);
        return f.apply(this, arguments)
    }
}
var log = [];
work = makeLogging(work, log);

work(2, 5);
work(5);
work(2, 5, 6, 9);

for (var i = 0; i < log.length; i++) {
    console.log('log line' + (i + 1) + ': ' + log[i])
}

console.log('-----------Part #3-------------');

function f(x) {
    return Math.random() * x;
}

function makeCaching(f) {
    var cache = {};
    return function (arg) {
        if (!(arg in cache)) {
            cache[arg] = f.call(this, arg);
        }
        return cache[arg];
    }
}
f = makeCaching(f);
var a, b;
a = f(1);
b = f(1);
console.log(a == b);
b = f(5);
console.log(a == b);
