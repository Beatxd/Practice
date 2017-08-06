'use strict';

let body = document.body;
let text = body.appendChild(document.createElement('p'));
text.innerHTML = 'Hide this text pls. Press the button:';
text.id = 'text1';

textHider(text1);

function textHider(elem) {
let button = elem.parentNode.insertBefore(document.createElement('input'), elem.nextElementSibling);
button.type = 'button';
button.value = 'Hide text';
button.addEventListener('click', function(){
    elem.hidden = true;
})
}


// ----------second part-----------

createOneClickButton('Click for hide me!');

function createOneClickButton(value) {
    let button = body.appendChild(document.createElement('input'));
    button.type = 'button';
    button.value = value;
    button.addEventListener('click', function(){
        button.hidden = true;
    })
}