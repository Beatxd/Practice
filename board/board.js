'use strict';
function Board(wrapperId, columns = 8, lines = 8) {
    if (columns > 26) return alert('create less columns');

    const letters = 'abcdifghigklmnopqrstuvwxyz'.split('', columns);

    const place = document.getElementById(wrapperId);
    const boardWrapper = place.appendChild(document.createElement('div'));
    boardWrapper.id = 'boardWrapper';

    boardWrapper.style.width = 50 * columns + 'px';

    // Create cells
    let createCells = (lines, columns) => {
        const numCells = lines * columns;
        console.log(numCells);
        let lineNum = 1;
        let j = 0;
        for (let i = 0; i < numCells; i++) {
            let newDiv = document.createElement('div');
            newDiv.id = letters[j] + lineNum;
            newDiv.className = 'boardCell';
            boardWrapper.appendChild(newDiv);
            j++;
            if (columns == j) {
                lineNum++;
                j = 0;
            }
        }
    };
    createCells(lines, columns);
}

function boardClick(elemId) {
    let elem = document.getElementById(elemId);
    let selectedCell;

    elem.onclick = function(event) {
        let target = event.target;
        while (target != this) {
            if (target.tagName == 'DIV') {
                highlight(target);
                return;
            }
            target = target.parentNode;
        }
    };

    function highlight(node) {
        if (selectedCell) {
            selectedCell.classList.remove('highlight');
        }
        selectedCell = node;
        selectedCell.classList.add('highlight');
    }
}

function Checkers(boardPlace){
    let board = new Board(boardPlace);
    boardClick('boardWrapper');
}


new Checkers('place');

