'use strict';
// Создайте функцию sumArgs(), которая будет суммировать все свои аргументы:
// Для решения примените метод reduce к arguments, используя call, apply или одалживание метода.
console.log(sumArgs(1, 2, 3, 15)); // 21, аргументы переданы через запятую, без массива

function sumArgs() {
    return [].reduce.call(arguments, function (a, b) {
        return a + b;
    });
}

// Напишите функцию applyAll(func, arg1, arg2...), которая получает функцию func и произвольное количество
// аргументов. Она должна вызвать func(arg1, arg2...), то есть передать в func все аргументы,
// начиная со второго, и возвратить результат.
console.log(applyAll(Math.max, 2, -2, 3)); // 3
console.log(applyAll(Math.min, 2, -2, 3)); // -2
console.log(applyAll(sum, 1, 2, 3)); // -> sum(1, 2, 3) = 6
console.log(applyAll(mul, 2, 3, 4)); // -> mul(2, 3, 4) = 24

function sum() { // суммирует аргументы
    return [].reduce.call(arguments, function (a, b) {
        return a + b;
    });
}
function mul() { // перемножает аргументы
    return [].reduce.call(arguments, function (a, b) {
        return a * b;
    });
}
function applyAll() {
    var args = [].slice.call(arguments);
    var func = args.shift();
    return func.apply(this, args);
}