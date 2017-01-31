// Первая часть
// Напишите функцию sumTo(n), которая для данного n вычисляет сумму чисел от 1 до n
// 1. С использованием цикла:
function sumToCicle(n) {
    var result = 0;
    for (n; n > 0; n--) {
        result += n;
    }
    return result;
}
console.log('Через цикл n = 3: ' + sumToCicle(3)); //6
console.log('Через цикл n = 100: ' + sumToCicle(100)); //5050

// 2. Через рекурсию
function sumToRecurs(n) {
    if (n == 1) return 1;
    return n + sumToRecurs(n - 1);
}
console.log('Через рекурсию n = 3: ' + sumToRecurs(3)); //6
console.log('Через рекурсию n = 100: ' + sumToRecurs(100)); //5050

// 3. С использованием формулы для суммы арифметической прогрессии.
function sumToFormula(n) {
    var result = (1 + n) / 2 * n;
    return result;
}
console.log('Через формулу n = 3: ' + sumToFormula(3)); //6
console.log('Через формулу n = 100: ' + sumToFormula(100)); //5050

// Вторая часть
// Задача – написать функцию factorial(n), которая возвращает факториал числа n!, используя рекурсивный вызов.
function factorial(n) {
    if (n == 1) return 1;
    return n * factorial(n - 1);
}
console.log('Факториал 5: ' + factorial(5)); // 120

// Третья часть
// Напишите функцию fib(n), которая возвращает n-е число Фибоначчи.
function fib(n) {
    if (n == 1 || n == 2) return 1;
    var i = 1, j = 1;
    for (n = n - 2; n > 0; n--) {
        var result = i + j;
        i = j;
        j = result;
    }
    return result;
}
console.log('Числа Фибоначчи(3, 7, 77):');
console.log(fib(3)); // 2
console.log(fib(7)); // 13
console.log(fib(77)); // 5527939700884757