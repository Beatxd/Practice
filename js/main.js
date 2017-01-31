function pow(x, n) {
    if (n != 1) {
        x = x * pow(x, n - 1);
    }
    return x;
}
var x1 = prompt('x?', '');
do {
    var n1 = prompt('Введите целое значение n', '');
} while (Math.round(n1) != n1);
alert(pow(x1, n1));
