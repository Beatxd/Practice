'use strict';
let divWrapper = document.createElement('div');
let innerDiv = divWrapper.appendChild(document.createElement('div'));

divWrapper.style.cssText = 'border: 3px solid black; background-color: green; width: 200px; ' +
    'height: 100px; position: relative';
innerDiv.style.cssText = 'background-color: red; width: 25px; height: 25px; ' +
    'border: 3px solid grey; position: absolute';

document.body.appendChild(divWrapper);

innerDiv.style.left = divWrapper.clientWidth / 2 - innerDiv.offsetWidth / 2 + 'px';
innerDiv.style.top = divWrapper.clientHeight / 2 - innerDiv.offsetHeight / 2 + 'px';


