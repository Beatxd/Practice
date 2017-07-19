'use strict';
function Board(placeId, newBoardId, columns = 8, lines = 8) {
    if (columns > 26) return alert('create less columns');

    this.lines = lines;
    this.columns = columns;
    this.letters = 'abcdifghigklmnopqrstuvwxyz'.split('', columns);
    this.cellsIdArr = [];
    
    const place = document.getElementById(placeId);
    const boardWrapper = place.appendChild(document.createElement('div'));
    boardWrapper.id = newBoardId;
    boardWrapper.className = 'boardWrapper';
    boardWrapper.style.width = 50 * columns + 'px';

    // Create cells
    let createCells = (lines, columns) => {
        const numCells = lines * columns;
        let lineNum = 1;

        for (let i = 0, j = 0; i < numCells; i++) {
            let newDiv = document.createElement('div');
            newDiv.id = this.letters[j] + lineNum;
            this.cellsIdArr.push(this.letters[j] + lineNum);
            colorSetter(j, lineNum, newDiv);
            boardWrapper.appendChild(newDiv);
            j++;
            if (columns == j) {
                lineNum++;
                j = 0;
            }
        }

        function colorSetter(i, lineNum, cell) {
            if (lineNum % 2) {
                if (i % 2)return cell.classList.add('blackCell');
                return cell.classList.add('whiteCell')
            }
            if (i % 2)return cell.classList.add('whiteCell');
            cell.classList.add('blackCell')
        }
    };
    createCells(lines, columns);
}

function Trash(placeId){
    placeId = document.getElementById(placeId);
    let div = placeId.appendChild(document.createElement('div'));
    div.className = 'boardTrash';
    let title = div.appendChild(document.createElement('h2'));
    title.innerHTML = 'Отбой:';
}

function Log(placeId, BoardId){
    placeId = document.getElementById(placeId);
    let div = placeId.appendChild(document.createElement('div'));
    div.className = 'boardLog';
    let title = div.appendChild(document.createElement('h2'));
    title.innerHTML = 'log:';

    this.tempLog = '';
    let logCount = 1; // Nuber of str. Need white/black colors
    // this.write
}

function Checkers(placeId, id = 'id' + Math.floor(Math.random() * 1000000)) {
    const blackFigure = '<img src="img\\black.png" class="checkersImg">';
    const whiteFigure = '<img src="img\\white.png" class="checkersImg">';
    let tempInnerHTML = '';
    let selectedCell;

    Board.apply(this, [placeId, id]);
    Trash.call(this, placeId);
    Log.apply(this, [placeId, id]);

    boardClick(id);
    trashClick();



    this.startGame = (startLines = 3) => {
        const cellsNum = this.columns * this.lines;
        for (let i = 1; i < startLines * this.columns; i++) {
            let cell = document.getElementById(this.cellsIdArr[i]);
            if (cell.classList.contains('blackCell')) {
                cell.innerHTML = blackFigure;
                cell = document.getElementById(this.cellsIdArr[cellsNum - i - 1]);
                cell.innerHTML = whiteFigure;
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
                    figureMove(target);
                    return;
                }
                target = target.parentNode;
            }

        };
    }
    function figureMove(cell) {
        if (cell.classList.contains('whiteCell')) return;
        if (cell.innerHTML != '') {
            if(tempInnerHTML != '') return;
            tempInnerHTML = cell.innerHTML;
            cell.innerHTML = '';
        } else {
            cell.innerHTML = tempInnerHTML;
            tempInnerHTML = '';
        }
    }
    function highlight(node) {
        if (selectedCell) {
            selectedCell.classList.remove('highlight');
        }
        selectedCell = node;
        selectedCell.classList.add('highlight');
    }
    function trashClick(){
        let trash = document.querySelector('.boardTrash');
        trash.onclick = function(){
            if(tempInnerHTML != ''){
                trash.innerHTML += tempInnerHTML;
                tempInnerHTML = '';
            }
        }
    }
}

new Checkers('place');

