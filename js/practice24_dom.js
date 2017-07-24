'use strict';
// ----------first part------------
let tbody = document.body.getElementsByTagName('tbody')[0];
for (let i = tbody.children.length - 1; i >= 0; i--) {
    tbody.children[i].children[i].style.backgroundColor = 'grey';
}

// ----------second part-----------  elem.remove() polyfill
if (!Element.prototype.remove) {
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
elem.innerHTML = '<b>new elem</b>';

insertAfter(elem, document.body.firstElementChild);

// ----------fourth part------------
function removeChildren(node) {
    while (node.lastChild) {
        // node.lastChild.remove(); // not crossbrowser
        node.removeChild(node.lastChild);
    }
}

// removeChildren(document.querySelector('ol'));

// ----------fifth part------------
let data = {
    animals: {
        monkey: {},
    },
    eat: {
        fruits: {
            apple: {
                red: {}
            },
            orange: {}
        },
        vegetables: {
            potato: {},
            onion: {}
        }
    }
};

let container = document.createElement('div');
createTree = treeNumDecorator(createTree);
createTree(container, data);
document.body.appendChild(container);

function createTree(container, obj) {
    if (isObjEmpty(obj)) return;
    let ul = document.createElement('ul');
    for (let key in obj) {
        let li = document.createElement('li');
        li.innerHTML = key;
        ul.appendChild(li);
        if (!isObjEmpty(obj)) createTree(li, obj[key]);
    }
    container.appendChild(ul);
}

function treeNumDecorator(f) {
    return function (container, obj) {
        f.apply(this, arguments);
        const liArr = container.querySelectorAll('li');
        liArr.forEach(function(li){
            let liNum = li.querySelectorAll('li').length;
            if(liNum && li.firstChild.data.search(/\[\d+\]$/) === -1) {
                li.firstChild.data += `[${liNum}]`;
            }
        })
    };
}

function isObjEmpty(obj) {
    for (let key in obj) {
        return false;
    }
    return true;
}