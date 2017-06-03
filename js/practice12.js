// "use strict";
//
// function ask(question, answer, ok, fail) {
//     var result = prompt(question, '');
//     if (result.toLowerCase() == answer.toLowerCase()) ok();
//     else fail();
// }
// var user = {
//     login: 'Василий',
//     password: '12345',
//
//     loginOk: function() {
//         alert( this.login + ' вошёл в сайт' );
//     },
//
//     loginFail: function() {
//         alert( this.login + ': ошибка входа' );
//     },
//
//     checkPassword: function() {
//         ask("Ваш пароль?", this.password, this.loginOk.bind(this), this.loginFail.bind(this));
//     }
// };
//
// var vasya = user;
// user = null;
// vasya.checkPassword();

"use strict";

function ask(question, answer, ok, fail) {
    var result = prompt(question, '');
    if (result.toLowerCase() == answer.toLowerCase()) ok();
    else fail();
}

var user = {
    login: 'Василий',
    password: '12345',

    // метод для вызова из ask
    loginDone: function(result) {
        alert( this.login + (result ? ' вошёл в сайт' : ' ошибка входа') );
    },

    checkPassword: function() {
        ask("Ваш пароль?", this.password, this.loginDone.bind(this, true), this.loginDone.bind(this, false))
    }
};

var vasya = user;
user = null;
vasya.checkPassword();