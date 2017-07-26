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
createCalendar('calendar', 2017, 10);

function createCalendar(containerId, year, month) {
    const parent = document.getElementById(containerId);
    // const date = new Date(year, month - 1);
    const daysInMonth = 32 - new Date(year, month - 1, 32).getDate();
    const days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
    const options = {
        year: 'numeric',
        month: 'long',
    };
    const firstWeekDay = new Date(year, month - 1, 1).getDay() || 7;
    const title = parent.appendChild(document.createElement('h2'));
    title.innerHTML = new Date(year, month - 1).toLocaleString('ru', options);

    let table = parent.appendChild(document.createElement('table'));
    let tr = newTr();

    for (let i = 0; i < days.length; i++) {
        tr.appendChild(document.createElement('th')).innerHTML = days[i];
    }

    tr = newTr();

    for (let i = 1; i < firstWeekDay; i++) {
        newTd(tr);
    }

    for (let i = 1, j = firstWeekDay - 1; i < firstWeekDay - 1 + daysInMonth; i++, j++) {
        if (j === 7) {
            j = 0;
            tr = newTr();
        }
        let td = newTd(tr);
        if (i <= daysInMonth) td.innerHTML = i;
    }

    function newTr() {
        return table.appendChild(document.createElement('tr'));
    }

    function newTd(trNode) {
        return trNode.appendChild(document.createElement('td'));
    }
}

// ----------seventh part------------

const ul = document.querySelector('ol');
ul.insertAdjacentHTML('beforeEnd', '<li>11</li><li>7</li><li>3</li>');

let usersTable = document.createElement('table');
usersTable.innerHTML = '<tr><th>Name</th><th>Surname</th><th>Age</th></tr><tr><td>John</td><td>Smith</td><td>23</td></tr><tr><td>John2</td><td>Smith2</td><td>40</td></tr><tr><td>John3</td><td>Smith3</td><td>15</td></tr>';
document.body.insertBefore(usersTable, document.body.firstChild);

usersSort(usersTable);

function usersSort(tableNode) {
    let usersArr = tableNode.querySelectorAll('tr');
    let usersTemp = [];
    const length = usersArr.length;
    for (let i = 0; i < length; i++) {
        if (!(usersArr[i].lastChild.innerHTML > 0)) continue;
        usersTemp.push(usersArr[i].parentNode.removeChild(usersArr[i]));
    }
    usersTemp.sort(ageSort);

    for (let i = 0; i < length; i++) {
        tableNode.appendChild(usersTemp[i]);
    }

    function ageSort(a, b) {
        if (a.lastChild.innerHTML > b.lastChild.innerHTML) return 1;
        if (a.lastChild.innerHTML < b.lastChild.innerHTML) return -1;
    }
}