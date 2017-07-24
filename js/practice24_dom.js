'use strict';
// ----------first part------------
let tbody = document.body.getElementsByTagName('tbody')[0];
for (let i = tbody.children.length - 1 ; i >= 0; i--) {
    tbody.children[i].children[i].style.backgroundColor = 'grey';
}

// ----------second part-----------  elem.remove() polyfill
if(!Element.prototype.remove) {
    Element.prototype.remove = function () {
        let parent = this.parentNode;
        if (!parent.lastChild) return;
        parent.removeChild(this);
    };
}

tbody.firstElementChild.remove();

// ----------third part------------
function insertAfter(elem, refElem) {
    // refElem.after(elem); poly?
    let parent = refElem.parentNode;
    return parent.insertBefore(elem, refElem.nextElementSibling);
}

let elem = document.createElement('div');
elem.innerHTML='<b>new elem</b>';

insertAfter(elem, document.body.firstElementChild);

// ----------fourth part------------
function removeChildren(node) {
    while(node.lastChild){
        // node.lastChild.remove(); // not crossbrowser
        node.removeChild(node.lastChild);
    }
}
// removeChildren(document.querySelector('.domTest'));
removeChildren(document.querySelector('ol'));