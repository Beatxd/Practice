'use strict';

let button = document.createElement('a');
button.innerHTML = 'Нажми меня';
button.style.cssText = '-moz-border-radius: 8px; \
-webkit-border-radius: 8px; \
border-radius: 8px; \
border: 2px groove green; \
display: block; \
height: 30px; \
line-height: 30px; \
width: 100px; \
text-decoration: none; \
text-align: center; \
color: red; \
font-weight: bold;';

document.body.appendChild(button);

// ----------second part-----------

/**
 * Показывает уведомление, пропадающее через 1.5 сек
 *
 * @param options.top {number} вертикальный отступ, в px
 * @param options.right {number} правый отступ, в px
 * @param options.cssText {string} строка стиля
 * @param options.className {string} CSS-класс
 * @param options.html {string} HTML-текст для показа
 */
function showNotification(options) {
    let notification = document.createElement('div');

    if (options.cssText) notification.style.cssText = options.cssText;
    notification.style.top = options.top + 'px' || 0;
    notification.style.right = options.right + 'px' || 0;
    if (options.className) notification.className = options.className;
    if (options.html) notification.innerHTML = options.html;

    notification.style.position = 'absolute';

    document.body.appendChild(notification);

    setTimeout(function () {
        notification.parentNode.removeChild(notification);
    }, 1500)
}

showNotification({
    top: 10,
    right: 10,
    html: "Привет",
    className: "welcome"
});

// ----------third part-----------

let divWrapper = document.createElement('div');
let innerDiv = divWrapper.appendChild(document.createElement('div'));

divWrapper.style.cssText = 'border: 3px solid black; background-color: green; width: 200px; ' +
    'height: 100px; position: relative';
innerDiv.style.cssText = 'background-color: red; width: 25px; height: 25px; ' +
    'border: 3px solid white; position: absolute';

document.body.appendChild(divWrapper);

innerDiv.style.left = divWrapper.clientWidth / 2 - innerDiv.offsetWidth / 2 + 'px';
innerDiv.style.top = divWrapper.clientHeight / 2 - innerDiv.offsetHeight / 2 + 'px';