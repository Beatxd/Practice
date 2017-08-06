'use strict';

let body = document.body;
let text = body.appendChild(document.createElement('p'));
text.innerHTML = 'Hide this text pls. Press the button:';
text.id = 'text1';

textHider(text1);
body.appendChild(document.createElement('br'));

function textHider(elem) {
let button = elem.parentNode.insertBefore(document.createElement('input'), elem.nextElementSibling);
button.type = 'button';
button.value = 'Hide text';
button.addEventListener('click', function(){
    elem.hidden = true;
})
}


// ----------second part-----------

createOneClickButton('Click to hide me!');

function createOneClickButton(value) {
    let button = body.appendChild(document.createElement('input'));
    button.type = 'button';
    button.value = value;
    button.addEventListener('click', function(){
        this.hidden = true;
    })
}


// ----------third part-----------

createSweetMenu();

function createSweetMenu() {
    let ul = document.createElement('ul');
    ul.innerHTML = 'Сладости (нажми меня)!';
    ul.className = 'sweetMenu';

    let li = ul.appendChild(document.createElement('li'));
    li.innerHTML = 'Торт';
    li = ul.appendChild(document.createElement('li'));
    li.innerHTML = 'Пончик';
    li = ul.appendChild(document.createElement('li'));
    li.innerHTML = 'Пирожное';

    body.appendChild(ul);

    ul.addEventListener('click', function(){
        let liArr = ul.querySelectorAll('li');
        for(let i = 0; i < liArr.length; i++){
            liArr[i].classList.toggle('hide');
        }
    })
}