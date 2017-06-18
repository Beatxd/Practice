'use strict';

function evilCalc() {
    try {
        var calc;
        if (arguments[0]) {
            console.log(arguments[0]);
            calc = prompt('Введите корректное выражение! Подробности ошибки в консоли', '2+2*2');
        } else {
            calc = prompt('Введите выражение для подсчета', '2+2*2');
        }
        if (!(eval(calc))) new Error('Syntax or Math error');
        console.log(eval(calc));
    }
    catch (e) {
        var error = 'Выражение введено с ошибкой: ' + e.name + '\n' + e.message;
        evilCalc(error);
    }
}

evilCalc();
