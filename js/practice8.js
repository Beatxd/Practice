// Напишите функцию-конструктор Calculator, которая создает объект с тремя методами:
//     Метод read() запрашивает два значения при помощи prompt и запоминает их в свойствах объекта.
//     Метод sum() возвращает сумму запомненных свойств.
//     Метод mul() возвращает произведение запомненных свойств.
var calculator = new CalculatorLite();
calculator.read();
alert("Sum = " + calculator.sum());
alert("Multiplication = " + calculator.mul());

function CalculatorLite() {
    this.read = function () {
        this.num1 = +prompt('Enter first value', 0);
        this.num2 = +prompt('Enter second value', 0);
    };
    this.sum = function () {
        return this.num1 + this.num2;
    };
    this.mul = function () {
        return this.num1 * this.num2;
    };
}

// Напишите функцию-конструктор Accumulator(startingValue). Объекты, которые она создает, должны хранить
// текущую сумму и прибавлять к ней то, что вводит посетитель.
var accumulator = new Accumulator(1); // начальное значение 1
accumulator.read(); // прибавит ввод prompt к текущему значению
accumulator.read(); // прибавит ввод prompt к текущему значению
alert( accumulator.value ); // выведет текущее значение

function Accumulator(startValue) {
    this.value = startValue;
    this.read = function () {
        this.value += +prompt('Enter a new num for calculate', 0);
    }
}


// Напишите конструктор Calculator, который создаёт расширяемые объекты-калькуляторы.
// first step: вызов calculate(str) принимает строку, например «1 + 2», с жёстко заданным
// форматом «ЧИСЛО операция ЧИСЛО» (по одному пробелу вокруг операции), и возвращает результат.
// Понимает плюс + и минус -.
var calc = new Calculator;
alert(calc.calculate("3 + 7")); // 10
alert(calc.calculate("3 - 7")); // -4
// second step – добавить калькулятору метод addMethod(name, func),
// который учит калькулятор новой операции.
// Он получает имя операции name и функцию от двух аргументов func(a,b),
// которая должна её реализовывать.
var powerCalc = new Calculator;
powerCalc.addMethod("*", function (a, b) {
    return a * b;
});
powerCalc.addMethod("/", function (a, b) {
    return a / b;
});
powerCalc.addMethod("**", function (a, b) {
    return Math.pow(a, b);
});

var result = powerCalc.calculate("2 ** 3");
alert(result); // 8
result = powerCalc.calculate("14 / 7");
alert(result); // 2

function Calculator() {
    this.arrOperationName = ['+', '-'];
    this.arrFunc = [function (a, b) {return a + b}, function (a, b) {return a - b}];
    this.calculate = function (str) {
        var arr = str.split(' ');
        if (arr[1] == '+') return +arr[0] + +arr[2];
        if (arr[1] == '-') return +arr[0] - +arr[2];
        for (var i = 0; i < this.arrOperationName.length; i++) {
            if (arr[1] == this.arrOperationName[i]) return this.arrFunc[i](arr[0], arr[2])
        }
    };
    this.addMethod = function (name, func) {
        this.arrOperationName.push(name);
        this.arrFunc.push(func);
    }
}