'use strict';
// -----------CoffeeMachine-------------
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
// subclass 'CoffeeMachine'
function CoffeeMachine(power, capacity) {
    Machine.apply(this, arguments);
    var parentEnable = this.enable; // for modernisation this.enable();
    var parentDisable = this.disable; // for modernisation this.enable();
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
        return console.log('onReady() is change!')
    };
    //getters
    this.getPower = function () {
        return this._power + ' Wt';
    };
    // public methods
    this.run = function () {
        if (!this._enabled) {
            console.log(new Error('CoffeeMachine didn\'t enable'));
            return;
        }
        if (!!timerId) {
            console.log(new Error('Process started already'));
            return;
        }
        timerId = setTimeout(function () {
            try {
                onReady();
            }
            catch (e) {
                console.log('incorrect onReady, return default');
                onReadyDefault();
            }
            finally {
                timerId = null; // for correct isRunning();
                waterAmount = 0;
            }
        }, this.getBoilTime());
    };
    this.stop = function () {
        clearTimeout(timerId);
        timerId = null; // for correct isRunning();
    };
    this.enable = function () {
        parentEnable();
        this.run();
    };
    this.disable = function () {
        parentDisable();
        this.stop();
    };
    this.getBoilTime = function () {
        return WATER_HEAT_CAPACITY * waterAmount * (100 - saveThis.waterTemperature) / this._power;
    };
    this.isRunning = function () {
        return !!timerId
    };
    // private methods
    var onReadyDefault = function () {
        console.log('Coffee is ready. ' + waterAmount + ' ml for ' +
            saveThis.getBoilTime() / 1000 + ' sec');
    };
    function onReady() {
        onReadyDefault();
    }
}

var boshCoffeeMachine = new CoffeeMachine(1000, 500);
console.log(boshCoffeeMachine.getPower());
boshCoffeeMachine.waterAmount(5); // low num for quick work
boshCoffeeMachine.addWater(5); // ok
// boshCoffeeMachine.addWater(499); // error. capacity
boshCoffeeMachine.enable();
// boshCoffeeMachine.stop();
boshCoffeeMachine.disable();
boshCoffeeMachine.setOnReady(function () {
    alert('Кофе готов. ' + boshCoffeeMachine.waterAmount() / 1000 + 'л за ' +
        boshCoffeeMachine.getBoilTime() / 1000 + ' сек');
});


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