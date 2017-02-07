/* Создайте функцию isEmpty(obj), которая возвращает true, если в объекте нет
 свойств и false – если хоть одно свойство есть. */
var schedule = {};
console.log(isEmpty(schedule)); // true
schedule["8:30"] = "подъём";
console.log(isEmpty(schedule)); // false

function isEmpty(obj) {
    return !Object.keys(obj).length > 0;
}

/* Есть объект salaries с зарплатами. Напишите код, который выведет сумму всех
 зарплат. Если объект пустой, то результат должен быть 0. */
var salaries = {
    "Вася": 100,
    "Петя": 300,
    "Даша": 250
};
totalSalaries(salaries); // 650

function totalSalaries(obj) {
    var result = 0;
    for (var key in obj) result += obj[key];
    console.log(result);
}
