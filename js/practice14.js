'use strict';
console.log('-----------Part #1-------------');

var neosBadDream = {
    name: 'Agent Smith',
    age: 900
};

var jsonStr = JSON.stringify(neosBadDream);
console.log(jsonStr);
var jsonPrs = JSON.parse(jsonStr);
console.log(jsonPrs);

console.log('-----------Part #2-------------');

var timerId = setInterval(function () {
    console.log('tic-tac');
}, 200);
setTimeout(function () {
    clearInterval(timerId);
    console.log('end of time')
}, 500);

var timerId2 = setTimeout(tick, 200);
setTimeout(function () {
    clearTimeout(timerId2);
    console.log('end of time2')
}, 500);
function tick() {
    console.log('tic-tac recursive');
    timerId2 = setTimeout(tick, 200);
}

setTimeout(function () {
    //part3 pause for right view in console

    console.log('-----------Part #3-------------');

    var count3 = 1;
    var timerId3 = setInterval(function () {
        console.log(count3);
        if (count3++ >= 20) clearInterval(timerId3);
    }, 100);
    setTimeout( function () {
        clearInterval(timerId3);
        console.log('2001ms out. Timer3');
    }, 2001);

    var count4 = 1;
    var timerId4 = setTimeout(function interval4() {
        console.log(count4);
        if (count4++ < 20) {
            timerId4 = setTimeout(interval4, 100)
        }
    }, 100);
    setTimeout(function () {
        clearTimeout(timerId4);
        console.log('2011ms out. Timer4');
        }, 2011); // only 19. need more time, than in timer3 (setInterval < setTimerRecursive)
}, 600);
