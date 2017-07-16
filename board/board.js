'use strict';
function Board(wrapperId, newBoardId, columns = 8, lines = 8) {
    if (columns > 26) return alert('create less columns');

    this.lines = lines;
    this.columns = columns;
    this.letters = 'abcdifghigklmnopqrstuvwxyz'.split('', columns);
    this.cellsIdArr = [];

    const place = document.getElementById(wrapperId);
    const boardWrapper = place.appendChild(document.createElement('div'));
    boardWrapper.id = newBoardId;
    boardWrapper.className = 'boardWrapper';

    boardWrapper.style.width = 50 * columns + 'px';

    // Create cells
    let createCells = (lines, columns) => {
        const numCells = lines * columns;
        let lineNum = 1;
        let j = 0;
        for (let i = 0; i < numCells; i++) {
            let newDiv = document.createElement('div');
            newDiv.id = this.letters[j] + lineNum;
            this.cellsIdArr.push(this.letters[j] + lineNum);
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


function Checkers(boardPlace, id = 'id' + Math.floor(Math.random() * 1000000)) {
    Board.apply(this, [boardPlace, id]);
    boardClick(id);
    let makeAvailable = () => {
        for (let i = 1, j = 1; i < this.lines * this.columns; i++, j++) {
            if (!(i % this.columns)) j++;
            if (j % 2) {
                let id = document.getElementById(this.cellsIdArr[i]);
                id.setAttribute('data-available','true');
            }
        }
    };
    makeAvailable();

    const blackFigure = '<img src="img\\black.png" class="checkersImg">';
    const whiteFigure = '<img src="img\\white.png" class="checkersImg">';

    this.startGame = (startLines = 3) => {
        const cellsNum = this.columns * this.lines;
        for (let i = 1, j = 1; i < startLines * this.columns; i++, j++) {
            if (!(i % this.columns)) j++;
            if (j % 2) {
                let id = document.getElementById(this.cellsIdArr[i]);
                id.innerHTML = blackFigure;
                id = document.getElementById(this.cellsIdArr[cellsNum - i - 1]);
                id.innerHTML = whiteFigure;
            }
        }
    };

    this.startGame();
    function boardClick(elemId) {
        let elem = document.getElementById(elemId);
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
    }

    let selectedCell;
    function highlight(node) {
        if (selectedCell) {
            selectedCell.classList.remove('highlight');
        }
        selectedCell = node;
        selectedCell.classList.add('highlight');
    }
}


new Checkers('place');

