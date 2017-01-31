// работа с неточными числами.
// Напишите функцию getDecimal(num), которая возвращает десятичную часть числа
console.log(getDecimal(12.345)); // 0.345
console.log(getDecimal(1.2)); // 0.2
console.log(getDecimal(-1.2)); // 0.2

function getDecimal(n) {
    var result = [0];

    n = (n > 0) ? n % 1 : -n % 1;
    n = n.toFixed(10);
    for (var i = 1; n[i] != '0'; i++) {
        result.push(n[i]);
    }

    return result.join('');
}

// Напишите функцию randomInteger(min, max) для генерации случайного целого
// числа между min и max, включая min,max как возможные значения.
function randomInteger(min, max){
    var result = Math.random() * (max - min) + min;
    return +result.toFixed(0);
}
console.log(randomInteger(5, 20)); // возвращается включая обе границы.