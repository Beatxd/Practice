'use strict';
function delay(ms){
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}

delay(1000)
    .then(() => console.log("Hello!"));


// second part


let urls = [
    'user.json',
    'guest.json'
];

function httpGet(url) {

    return new Promise(function(resolve, reject) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function () {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
    });
}

let chain = Promise.resolve();

let results = [];

// в цикле добавляем задачи в цепочку
urls.forEach(function(url) {
    chain = chain
        .then(() => httpGet(url))
        .then((result) => {
            results.push(result);
        });
});

chain.then(() => {
    alert(results);
});