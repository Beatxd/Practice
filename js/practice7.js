// Код ниже получает из массива строк новый массив, содержащий их длины:
// Перепишите выделенный участок: уберите цикл, используйте вместо него метод map.
var arr = ["Есть", "жизнь", "на", "Марсе"];
// var arrLength = [];
// for (var i = 0; i < arr.length; i++) {
//     arrLength[i] = arr[i].length;
// }
var arrLength = arr.map(function (item) {
    return item.length;
});
console.log(arrLength); // 4,5,2,5

/* На входе массив чисел, например: arr = [1,2,3,4,5].
 Напишите функцию getSums(arr), которая возвращает массив его частичных сумм.
 Иначе говоря, вызов getSums(arr) должен возвращать новый массив из такого же числа
 элементов, в котором на каждой позиции должна быть сумма элементов arr до этой позиции
 включительно.
 Функция не должна модифицировать входной массив.
 В решении используйте метод arr.reduce. */
var arr2 = [1, 2, 3, 4, 5];
console.log(getSums(arr2)); // [ 1, 1+2, 1+2+3, 1+2+3+4, 1+2+3+4+5 ] = [ 1, 3, 6, 10, 15 ]
console.log(arr2); // Остался прежним [1, 2, 3, 4, 5]

function getSums(arr) {
    var newArr = [];
    arr.reduce(function (sum, item) {
        sum += item;
        newArr.push(sum);
        return sum;
    }, 0);
    return newArr;
}

