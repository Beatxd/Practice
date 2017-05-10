function User(fullName) {
    this.fullName = fullName;
    this.split = this.fullName.split(' ');
}

var vasya = new User("Василий Попкин");

Object.defineProperties(vasya, {
    firstName: {
        get: function () {
            return this.split[0];
        },
        set: function (value) {
            this.split[0] = value;
            this.fullName = this.split.join(' ');
        }
    },
    lastName: {
        get: function () {
            return this.split[1];
        },
        set: function (value) {
            this.split[1] = value;
            this.fullName = this.split.join(' ');
        }
    }
});

// чтение firstName/lastName
console.log(vasya.firstName); // Василий
console.log(vasya.lastName); // Попкин

// запись в lastName
vasya.lastName = 'Сидоров';
console.log(vasya.fullName); // Василий Сидоров