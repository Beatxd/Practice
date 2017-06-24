'use strict';
// -----------CoffeeMachine-------------
function CoffeeMachine(power) {
    this._power = power;
    this._waterAmount = 0;
    this._timerId;
    this._waterTemperature = 20;
}
CoffeeMachine.prototype.WATER_HEAT_CAPACITY = 4200;
CoffeeMachine.prototype.setWaterAmount = function (num) {
    this._waterAmount = num;
};
CoffeeMachine.prototype.run = function () {
        this._timerId = setTimeout(function () {
            this._waterAmount = 0;
            console.log('coffee is ready!')
        }, this.getBoilTime());
};
CoffeeMachine.prototype.stop = function () {
    clearTimeout(this._timerId);
};
CoffeeMachine.prototype.getBoilTime = function () {
    return this.WATER_HEAT_CAPACITY * this._waterAmount * (100 - this._waterTemperature) / this._power;
};

var boshCoffee = new CoffeeMachine(1000);
boshCoffee.setWaterAmount(5);
boshCoffee.run();
boshCoffee.stop();