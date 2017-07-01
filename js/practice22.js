'use strict';
if (!Object.create) {
    Object.create = function (proto) {
        function Empty() {
        }

        Empty.prototype = proto;
        return new Empty();
    }
}

function Menu(state) {
    this._state = state || Menu.prototype.STATE_CLOSED;
}
Menu.prototype.STATE_OPEN = 1;
Menu.prototype.STATE_CLOSED = 0;

Menu.prototype.open = function () {
    this._state = Menu.prototype.STATE_OPEN;
};
Menu.prototype.close = function () {
    this._state = this.STATE_CLOSED;
};
Menu.prototype._stateAsString = function () {
    switch (this._state) {
        case this.STATE_OPEN:
            return 'открыто';
        case this.STATE_CLOSED:
            return 'закрыто';
    }
};
Menu.prototype.showState = function () {
    console.log(this._stateAsString());
};


function AnimatingMenu(state) {
    Menu.apply(this, arguments);
    this._timerId;
}
AnimatingMenu.prototype = Object.create(Menu.prototype);
AnimatingMenu.prototype.constructor = AnimatingMenu;
AnimatingMenu.prototype.STATE_ANIMATING = 2;
AnimatingMenu.prototype.animating = function () {
    this._state = this.STATE_ANIMATING;
};
AnimatingMenu.prototype.open = function () {
    var saveThis = this;
    this.animating();
    this._timerId = setTimeout(function () {
        Menu.prototype.open.call(saveThis)
    }, 1000);
};
AnimatingMenu.prototype.close = function () {
    this._timerId = null;
    Menu.prototype.close.call(this);
};

AnimatingMenu.prototype._stateAsString = function () {
    switch (this._state) {
        case this.STATE_OPEN:
            return 'открыто';
        case this.STATE_CLOSED:
            return 'закрыто';
        case this.STATE_ANIMATING:
            return 'анимация'
    }
};

// использование..

var menu = new AnimatingMenu();

menu.showState(); // закрыто
menu.open();
menu.showState(); // анимация

// setTimeout(function () {
//     menu.showState(); // открыто
//     menu.close();
//     menu.showState(); // закрыто (закрытие без анимации)
// }, 1000);


console.log('----------------Second part----------------');

function FormatError(str) {
    this.name = 'FormatError';
    this.message = str;
    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    } else {
        this.stack = (new Error()).stack;
    }
}
FormatError.prototype = Object.create(SyntaxError.prototype);
FormatError.prototype.constructor = FormatError;

var err = new FormatError("ошибка форматирования");

console.log(err.message);
console.log(err.name);
console.log(err.stack);

console.log(err instanceof SyntaxError); // true

