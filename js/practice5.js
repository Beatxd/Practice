// Напишите код для вывода случайного значения из массива:
var arr = ["Яблоко", "Апельсин", "Груша", "Лимон", "Стейк", "Клубника"];
console.log(randomReturn(arr));

function randomReturn(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
/* Напишите код, который:
 Запрашивает по очереди значения при помощи prompt и сохраняет их в массиве.
 Заканчивает ввод, как только посетитель введёт пустую строку, не число
 или нажмёт «Отмена».
 При этом ноль 0 не должен заканчивать ввод, это разрешённое число.
 Выводит сумму всех значений массива */

arr2 = [];
enterValues(arr2);
console.log(calcArrValues(arr2));

function enterValues(arr) {
    var value;
    do {
        value = prompt('Enter new value in Arr', '');
        if (!(value >= 0 || value < 0) || value === null) break;
        arr.push(+value);
    } while (true);
    return arr
}
function calcArrValues(arr) {
    var result = 0;
    for (var i = 0; i < arr.length; i++) result += arr[i]
    return result;
}

/* Создайте функцию find(arr, value), которая ищет в массиве arr значение
 value и возвращает его номер, если найдено, или -1, если не найдено. */

arr3 = ["test", 2, 1.5, false];

console.log(find(arr3, "test")); // 0
console.log(find(arr3, 2)); // 1
console.log(find(arr3, 1.5)); // 2
console.log(find(arr3, 0)); // -1

function find(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (val === arr[i]) return i;
    }
    return -1;
}

/*Создайте функцию filterRange(arr, a, b), которая принимает массив чисел
 arr и возвращает новый массив, который содержит только числа из arr из
 диапазона от a до b. То есть, проверка имеет вид a ≤ arr[i] ≤ b. Функция
 не должна менять arr. */

var arr4 = [5, 4, 3, 8, 0, 4, 3];
var filtered = filterRange(arr4, 3, 5); // filtered = [5, 4, 3, 4, 3]

console.log(filtered);

function filterRange(arr, a, b) {
    var filteredArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] >= a && arr[i] <= b) filteredArr.push(arr[i]);
    }
    return filteredArr;
}

/* На входе массив чисел, например: .
 Задача – найти непрерывный подмассив arr, сумма элементов которого максимальна.
 Ваша функция должна возвращать только эту сумму. */

console.log(getMaxSubSum([-1, 2, 3, -9])); // 5
console.log(getMaxSubSum([2, -1, 2, 3, -9])); // 6;
console.log(getMaxSubSum([-1, 2, 3, -9, 11])); // 11;
console.log(getMaxSubSum([-2, -1, 1, 2])); // 3;
console.log(getMaxSubSum([100, -9, 30, 2, -3, 5])); // 125;
console.log(getMaxSubSum([1, 2, 3])); // 6;
console.log(getMaxSubSum([-1, -2, -3])); // 0;
console.log(getMaxSubSum([100, -9, 30, 2, -130, 10, 50, 10, -10, 50, 10, 50])); // 170;

function getMaxSubSum(arr){
    var sum = 0;
    var result = 0;
    for (var i = 0; i < arr.length; i++){
        sum += arr[i];
        if (sum < 0) sum = 0;
        if(sum > result) result = sum;
        // Проверка поведения:
        // console.log('Проход №' + i + '  sum = ' + sum + '  res = ' + result);
    }
    return result;
}