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
        liArr.forEach(function (li) {
            let liNum = li.querySelectorAll('li').length;
            if (liNum && li.firstChild.data.search(/\[\d+\]$/) === -1) {
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


// ----------sixth part------------

document.body.appendChild(document.createElement('div')).id = 'calendar';
createCalendar('calendar', 2012, 9);

function createCalendar(containerId, year, month) {
    const parent = document.getElementById(containerId);
    // const date = new Date(year, month - 1);
    const daysInMonth = 32 - new Date(year, month - 1, 32).getDate();
    const days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
    const options = {
        year: 'numeric',
        month: 'long',
    };

    const title = parent.appendChild(document.createElement('h2'));
    title.innerHTML = new Date(year, month - 1).toLocaleString('ru', options);

    let table = parent.appendChild(document.createElement('table'));

    const tr = newTr();
    for (let i = 0; i < days.length; i++) {
        tr.appendChild(document.createElement('th')).innerHTML = days[i];
    }
    for (let i = 1; i <= daysInMonth; i++) {
        console.log(new Date(year, month - 1, i).getDay());
    }


    function newTr() {
        return table.appendChild(document.createElement('tr'));
    }

    function newTd(trNode) {
        return trNode.appendChild(document.createElement('td'));
    }
}