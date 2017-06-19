'use strict';
// -----------Fridge-------------
// Main class 'Machine'
function Machine(power) {
    var saveThis = this;
    this._enabled = false;
    this._power = power;

    this.enable = function () {
        saveThis._enabled = true;
    };
    this.disable = function () {
        saveThis._enabled = false;
    };
}

function Fridge(power) {
    Machine.apply(this, arguments);
    var saveThis = this;
    var food = [];
    var parentDisable = this.disable;

    this.disable = function () {
        if (food.length) throw new Error('Fridge not empty');
        parentDisable();
    };
    this.addFood = function () {
        if (!this._enabled) throw new Error('Please turn ON fridge');
        if (food.length + arguments.length > getMaxFood()) {
            throw new Error('Can\'t add more food. Need new Fridge or increase power');
        }
        for (var i = 0; i < arguments.length; i++) {
            food.push(arguments[i]);
        }
    };
    this.getFood = function () {
        return food.slice();
    };
    this.removeFood = function (item) {
        item = toLowCase(item);
        var index = food.indexOf(item);
        if (index != -1) {
            console.log('Fridge: ' + food[index] + ' deleted');
            food.splice(index, 1);
        }
        food.forEach(function (elem, i, arr) {
            for (var key in elem) {
                if (toLowCase(elem[key]) == item) {
                    console.log('Fridge: ' + key + ' ' + elem[key] + ' deleted');
                    arr.splice(i, 1);
                }
            }
        })
    };
    this.filterFood = function (func) {
        return food.filter(func)
    };

    function getMaxFood() {
        return saveThis._power / 100;
    }
    function toLowCase(str) {
        return (typeof str == 'string') ? str.toLowerCase() : str;
    }
}

var fridge = new Fridge(600);
fridge.enable();
fridge.addFood({
    title: 'meat',
    calories: 100
});
fridge.addFood({
    title: 'onion',
    calories: 10
});
fridge.addFood({
    title: 'juice',
    calories: 30
});
fridge.addFood({
    title: 'Milk',
    calories: 150
});
fridge.addFood({
    title: 'Beer',
    calories: 120
});
fridge.addFood('chocolate');

fridge.removeFood(100);
fridge.removeFood('mILK');
console.log(fridge.getFood());
var dietItems = fridge.filterFood(function (item) {
    return item.calories < 50;
});
dietItems.forEach(function (item) {
    fridge.removeFood(item);
});
console.log(fridge.getFood());
// fridge.disable(); // error: not empty