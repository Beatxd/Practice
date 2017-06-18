'use strict';
// -----------CoffeeMachine-------------

function CoffeeMachine(power, capacity) {
    var saveThis = this;
    var waterAmount = 0;
    var timerId;
    var WATER_HEAT_CAPACITY = 4200;
    this.waterTemperature = 20;

    this.waterAmount = function (amount) {
        // getter
        if (!arguments.length) return waterAmount;
        // setter
        if (amount < 0) throw new Error('Water amount cant be < 0');
        if (amount > capacity) throw new Error('Cant add more water than ' + capacity + 'ml');
        waterAmount = amount;
    };
    // setters
    this.addWater = function (ml) {
        this.waterAmount(waterAmount + ml);
    };
    this.setOnReady = function (func) {
        onReady = func;
        return console.log('What to do on ready is change!')
    };
    //getters
    this.getPower = function () {
        return power + ' Wt';
    };
    // public methods
    this.run = function () {
        timerId = setTimeout(function () {
            try {
                onReady()
            }
            catch (e) {
                console.log('incorrect onReady');
            }
        }, this.getBoilTime());
    };
    this.stop = function () {
        clearTimeout(timerId);
    };
    this.getBoilTime = function () {
        return WATER_HEAT_CAPACITY * waterAmount * (100 - saveThis.waterTemperature) / power;
    };
    // private methods

    function onReady() {
        console.log('Coffee is ready. ' + boshCoffeeMachine.waterAmount() + ' ml for ' +
            boshCoffeeMachine.getBoilTime() / 1000 + ' sec');

    }
}

var boshCoffeeMachine = new CoffeeMachine(1000, 500);
console.log(boshCoffeeMachine.getPower());
boshCoffeeMachine.waterAmount(5); // low num for quick work
boshCoffeeMachine.addWater(5); // ok
// boshCoffeeMachine.addWater(500); // error. capacity
console.log(boshCoffeeMachine.waterAmount());
boshCoffeeMachine.run();
boshCoffeeMachine.setOnReady(function () {
    alert('Кофе готов. ' + boshCoffeeMachine.waterAmount() / 1000 + 'л за ' +
        boshCoffeeMachine.getBoilTime() / 1000 + ' сек');
});
boshCoffeeMachine.stop();

// -----------User-------------

function User() {
    var firstName, surname;

    this.setFirstName = function (str) {
        firstName = str;
    };
    this.setSurname = function (str) {
        surname = str;
    };
    this.getFullName = function () {
        return firstName + ' ' + surname;
    }
}

var userAgentSmtith = new User();
userAgentSmtith.setFirstName('codename "Like a Boss"');
userAgentSmtith.setSurname('Smith');
console.log(userAgentSmtith.getFullName());