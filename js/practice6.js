/* В объекте есть свойство className, которое содержит список «классов» – слов,
 разделенных пробелом. Создайте функцию addClass(obj, cls), которая добавляет в
 список класс cls, но только если его там еще нет.
 P.S. Ваша функция не должна добавлять лишних пробелов. */
var obj = {
    className: 'open menu'
};

addClass(obj, 'new'); // obj.className='open menu new'
console.log(obj.className);
addClass(obj, 'open'); // без изменений (класс уже существует)
console.log(obj.className);
addClass(obj, 'me'); // obj.className='open menu new me'
console.log(obj.className); // "open menu new me"

function addClass(obj, newClass) {
    var arr = obj.className.split(' ');
    if (check()) arr.push(newClass);
    obj.className = arr.join(' ');

    function check() {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == newClass) return false;
        }
        return true;
    }
}

/* Напишите функцию camelize(str), которая преобразует строки вида «my-short-string»
 в «myShortString». То есть, дефисы удаляются, а все слова после них получают
 заглавную букву.*/
console.log(camelize("background-color")); // 'backgroundColor';
console.log(camelize("list-style-image")); // 'listStyleImage';
console.log(camelize("-webkit-transition")); // 'WebkitTransition';

function camelize(text) {
    arr = text.split('-');
    for (var i = 1; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join('');
}

/* Напишите функцию removeClass(obj, cls), которая удаляет класс cls, если он есть
 P.S. Дополнительное усложнение. Функция должна корректно обрабатывать дублирование
 класса в строке. Лишних пробелов после функции образовываться не должно. */
obj = {
    className: 'my menu menu'
};
removeClass(obj, 'menu');
console.log(obj.className); // 'my'

function removeClass(obj, removedClass) {
    var classArr = obj.className.split(' ');
    for (var i = 0; i < classArr.length; i++) {
        if (classArr[i] == removedClass) {
            classArr.splice(i, 1);
            i--;
        }
    }
    obj.className = classArr.join(' ');
}

/* Создайте функцию filterRangeInPlace(arr, a, b), которая получает массив с числами
 arr и удаляет из него все числа вне диапазона a..b. То есть, проверка имеет вид
 a ≤ arr[i] ≤ b. Функция должна менять сам массив и ничего не возвращать. */

arr = [5, 5, 3, 3, 8, 8, 1];
filterRangeInPlace(arr, 1, 4); // удалены числа вне диапазона 1..4
console.log(arr); // массив изменился: остались [3, 3, 1]

function filterRangeInPlace(arr, a, b) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < a || arr[i] > b) {
            arr.splice(i, 1);
            i--;
        }
    }
}

// Как отсортировать массив чисел в обратном порядке?
var arr2 = [5, 2, 1, -10, 8];
console.log(arr2.sort(function reverseSort(a, b) { // [8, 5, 2, 1, -10]
    return b - a;
}));

// Есть массив строк arr. Создайте массив arrSorted – из тех же элементов,
// но отсортированный. Исходный массив не должен меняться.
var arr3 = ["HTML", "JavaScript", "CSS"];
// arrSorted = sortOfArr(arr);
arrSorted = arr3.slice().sort();
console.log(arrSorted); // CSS, HTML, JavaScript
console.log(arr3); // HTML, JavaScript, CSS (без изменений)
// function sortOfArr(arr) {
//     var newArr = [];
//     arr.forEach(function(item){
//         newArr.push(item);
//     });
//     return newArr.sort();
// }

// Напишите код, который отсортирует массив объектов people по полю age.
// Выведите список имён в массиве после сортировки.
var vasya = {name: "Вася", age: 23};
var masha = {name: "Маша", age: 18};
var vovochka = {name: "Вовочка", age: 6};
var people = [vasya, masha, vovochka];
var sortedNames = []; // Для внесения имен после соритровки

people.sort(sortByAge);
people.forEach(function (item) {
    sortedNames.push(item.name);
});

function sortByAge(a, b) {
    return a.age - b.age;
}

console.log(sortedNames); // теперь people: [vovochka, masha, vasya]
console.log(people[0].age); // 6

/*    1.Напишите функцию printList(list), которая выводит элементы списка по очереди,
 при помощи цикла.
 2. Напишите функцию printList(list) при помощи рекурсии.
 3. Напишите функцию printReverseList(list), которая выводит элементы списка в обратном
 порядке, при помощи рекурсии. Для списка выше она должна выводить 4,3,2,1
 4. Сделайте вариант printReverseList(list), использующий не рекурсию, а цикл. */

var list = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};
printList1(list); // 1, 2, 3, 4
printList2(list); // 1, 2, 3, 4
printReverseList1(list); // 4, 3, 2, 1
printReverseList2(list); // 4, 3, 2, 1

function printList1(list) {
    var tmpList = list;
    var arr = [];
    while (tmpList) {
        arr.push(tmpList.value);
        tmpList = tmpList.next;
    }
    console.log(arr.join(', '));
}
function printList2(list) {
    console.log(list.value);
    if (list.next) printList2(list.next);
    // for (var key in list){
    //     if (typeof list[key] != 'number') {
    //         printList2(list[key]);
    //         break;
    //     }
    //     console.log(list[key]);
    // }
    // });
}
function printReverseList1(list) {
    var tmpList = list;
    var arr = [];
    while (tmpList) {
        arr.push(tmpList.value);
        tmpList = tmpList.next;
    }
    console.log(arr.reverse().join(', '));
}
function printReverseList2(list) {
    if (list.next) printReverseList2(list.next);
    console.log(list.value);
}

/* Напишите функцию aclean(arr), которая возвращает массив слов, очищенный от анаграмм.
 Из каждой группы анаграмм должно остаться только одно слово, не важно какое.
 */
var arr = ["воз", "киборг", "корсет", "ЗОВ", "гробик", "костер", "сектор"];
console.log(aclean(arr)); // "ЗОВ,гробик,сектор"

function aclean(arr) {
    var tmpArr = [];
    var tmpObj = {};
    for (var i = 0; i < arr.length; i++) {
        var tmpItem = arr[i].split('').sort().join('').toLowerCase();
        tmpObj[tmpItem] = arr[i];
    }
    for (var key in tmpObj) {
        tmpArr.push(tmpObj[key]);
    }
    return tmpArr;
}

/* Напишите функцию unique(arr), которая возвращает массив, содержащий только уникальные
 элементы arr.
 PS Сработает и предыдущая функция, которую можно чуть упростить */

var strings = ["кришна", "кришна", "харе", "харе",
    "харе", "харе", "кришна", "кришна", "8-()"
];
console.log(aclean(strings)); // кришна, харе, 8-()