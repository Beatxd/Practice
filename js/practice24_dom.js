'use strict';
let tbody = document.body.getElementsByTagName('tbody')[0];
for (let i = tbody.children.length - 1 ; i >= 0; i--) {
    tbody.children[i].children[i].style.backgroundColor = 'grey'
}
