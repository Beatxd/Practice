// Напишите функцию ucFirst(str), которая возвращает строку str с заглавным первым символом
console.log(ucFirst("вася"));
console.log(ucFirst("")); // нет ошибок при пустой строке

function ucFirst(str) {
    return str = str.charAt(0).toUpperCase() + str.slice(1);
}

/* Напишите функцию checkSpam(str), которая возвращает true, если строка str содержит
 „viagra“ или „XXX“, а иначе false. Функция должна быть нечувствительна к регистру: */
console.log(checkSpam('buy ViAgRA now')); // true
console.log(checkSpam('free XxXxX')); // true
console.log(checkSpam("innocent rabbit")); // false

function checkSpam(str) {
    str = str.toLowerCase();
    return !!(~str.indexOf('viagra') || ~str.indexOf('xxx'));
}

/* Создайте функцию truncate(str, maxlength), которая проверяет длину строки str, и если
 она превосходит maxlength – заменяет конец str на "...", так чтобы ее длина стала равна
 maxlength. */
console.log(truncate("Вот, что мне хотелось бы сказать на эту тему:", 20));
// "Вот, что мне хоте..."
console.log(truncate("Всем привет!", 20)); // "Всем привет!"

function truncate(str, maxlength) {
    return (str.length > maxlength) ? str.slice(0, maxlength - 3) + '...' : str;
}

/* Есть стоимость в виде строки: "$120". То есть, первым идёт знак валюты, а затем – число.
Создайте функцию extractCurrencyValue(str), которая будет из такой строки выделять
число-значение, в данном случае 120. */
console.log(extractCurrencyValue('$120'));

function extractCurrencyValue(str) {
    return +str.slice(1);
}