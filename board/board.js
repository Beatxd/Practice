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
            if (columns === j) {
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

function Trash(placeId) {
    placeId = document.getElementById(placeId);
    let div = placeId.appendChild(document.createElement('div'));
    div.className = 'boardTrash';
    let title = div.appendChild(document.createElement('h2'));
    title.innerHTML = 'Отбой:';

}

function Log(placeId, boardId) {
    placeId = document.getElementById(placeId);
    boardId = document.getElementById(boardId);

    let mainLog = placeId.appendChild(document.createElement('div'));
    mainLog.className = 'boardLog';
    let currentTurn = mainLog.appendChild(document.createElement('h2'));
    currentTurn.innerHTML = "Ход <b id='currentTurn'></b>";
    let title = mainLog.appendChild(document.createElement('h2'));
    title.innerHTML = 'log:';
    this.logList = mainLog.appendChild(document.createElement('ul'));

    this.logWriteTurn = (str) => {
        if (!str) return;
        let li = this.logList.appendChild(document.createElement('li'));
        li.innerHTML = str;
        return li;
    };
    this.logMessage = (str, color = '#000') => {
        if (!str) return;
        let p = this.logList.appendChild(document.createElement('p'));
        p.style.color = color;
    };
}

function Checkers(placeId, id = 'id' + Math.floor(Math.random() * 1000000)) {
    Board.apply(this, [placeId, id]);
    Trash.call(this, placeId);
    Log.apply(this, [placeId, id]);
    let tempInnerHTML = '';
    boardClick(id);
    trashClick(tempInnerHTML);

    const blackFigure = '<img src="img\\black.png" class="checkersImg blackFigure">';
    const whiteFigure = '<img src="img\\white.png" class="checkersImg whiteFigure">';
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

    let selectedCell;
    let allNearCellsFinder = (cell, offHighlight) => {
        if (offHighlight) {
            let highlightCells = document.getElementById(id).querySelectorAll('.highlightAvailable');
            highlightCells.forEach((cell) => {
                cell.classList.remove('highlightAvailable');
            });
            return;
        }

        let leftUp = nearCellFinder(cell, 'left', 'up');
        let rightUp = nearCellFinder(cell, 'right', 'up');
        let leftDown = nearCellFinder(cell, 'left', 'down');
        let rightDown = nearCellFinder(cell, 'right', 'down');
        //highlight available

        if (isWhite(cell)) {
            if (leftUp) highlightPath(leftUp);
            if (rightUp) highlightPath(rightUp);
        }
        if (!isWhite(cell)) {
            if (leftDown) highlightPath(leftDown);
            if (rightDown) highlightPath(rightDown);
        }


    };

    function boardClick(elemId) {
        let elem = document.getElementById(elemId);
        elem.onclick = function (event) {
            let target = event.target;

            while (target !== this) {
                if (target.tagName === 'DIV') {
                    highlight(target);
                    figureMove(target);
                    return;
                }
                target = target.parentNode;
            }

        };
    }

    let tempLoggerCell; //used in figureMove
    let tempLoggerTurn;
    let tempLoggerLi;
    let logCount = 1;
    let logger = (firstCell, secondCell) => {
        if (!tempInnerHTML) {
            tempLoggerCell = null;
            return;
        }
        if (firstCell) tempLoggerCell = firstCell;
        if (tempLoggerCell === secondCell) {
            tempLoggerCell = null;
            return;
        }
        if (tempLoggerCell && secondCell) {
            if (tempLoggerTurn) {
                tempLoggerLi.remove();
                this.logWriteTurn(`${logCount}.) <b>${tempLoggerTurn}</b> :^: <b>${tempLoggerCell
                    .toUpperCase()} - ${secondCell.toUpperCase()}</b>`);
                tempLoggerTurn = null;
                logCount++;
            } else {
                tempLoggerTurn = `${tempLoggerCell.toUpperCase()} - ${secondCell.toUpperCase()}`;
                tempLoggerLi = this.logWriteTurn(`${logCount}.) <b>${tempLoggerTurn}</b>`);
            }
            tempLoggerCell = null;
            if (this.logList.children.length > 20) {
                this.logList.children[this.logList.children.length - 21].setAttribute('hidden', 'true')
            }
        }

    };

    let currentTurn = document.getElementById('currentTurn');
    currentTurn.classList.add('whiteTurn');
    currentTurn.innerHTML = 'белых';
    function figureMove(cell) {
        if (cell.classList.contains('whiteCell')) return;
        if (cell.innerHTML !== '') {
            if (tempInnerHTML !== '') return;
            if (!isTurnAvailable(cell)) return;
            tempInnerHTML = cell.innerHTML;
            logger(cell.id);
            allNearCellsFinder(cell);
            isBeatAvailable(cell);
            cell.innerHTML = '';
        } else {
            if (!cell.classList.contains('highlightAvailable')) {
                if (tempLoggerCell) {
                    document.getElementById(tempLoggerCell).innerHTML = tempInnerHTML;
                }
                tempInnerHTML = '';
                tempLoggerCell = null;
                allNearCellsFinder(null, true);
                return;
            }
            cell.innerHTML = tempInnerHTML;
            logger(false, cell.id);
            tempInnerHTML = '';
            allNearCellsFinder(null, true);
            currentTurnToggle(currentTurn);
        }
    }

    const nearCellFinder = (cell, horizChange, vertChange) => {
        const current = cell.id.split('');
        const letters = this.letters;
        let letterIndex = letters.indexOf(current[0]);
        let result = '';

        if (horizChange === 'left') {
            if (letterIndex > 0) {
                result = letters[letterIndex - 1];
            } else {
                return cell;
            }
        }
        if (horizChange === 'right') {
            if (letterIndex < letters.length - 1) {
                result = letters[letterIndex + 1];
            } else {
                return cell;
            }
        }
        if (vertChange === 'up') {
            if (current[1] > 1) {
                result += current[1] - 1;
            } else {
                return cell;
            }
        }
        if (vertChange === 'down') {
            if (current[1] < 8) {
                result += +current[1] + 1;
            } else {
                return cell;
            }
        }
        return document.getElementById(result);
    };
    function currentTurnToggle(node) {
        if (node.classList.contains('whiteTurn')) {
            node.innerHTML = 'черных';
            node.classList.remove('whiteTurn');
            node.classList.add('blackTurn');
        } else {
            node.innerHTML = 'белых';
            node.classList.remove('blackTurn');
            node.classList.add('whiteTurn');
        }
    }

    function isWhite(node) {
        if (!node.lastElementChild) return -1;
        return node.lastElementChild.classList.contains('whiteFigure');
    }

    function isEmpty(node) {
        return !node.lastElementChild
    }
    function isBeatAvailable(node) {
        if (!isEmpty(nearCellFinder(node, 'left', 'up')) && isWhite(node) !== isWhite(nearCellFinder(node, 'left', 'up'))) {
            highlightPath(nearCellFinder(nearCellFinder(node, 'left', 'up'), 'left', 'up'));
        }
        if (!isEmpty(nearCellFinder(node, 'right', 'up')) && isWhite(node) !== isWhite(nearCellFinder(node, 'right', 'up'))) {
            highlightPath(nearCellFinder(nearCellFinder(node, 'right', 'up'), 'right', 'up'));
        }
        if (!isEmpty(nearCellFinder(node, 'left', 'down')) && isWhite(node) !== isWhite(nearCellFinder(node, 'left', 'down'))) {
            highlightPath(nearCellFinder(nearCellFinder(node, 'left', 'down'), 'left', 'down'));
        }
        if (!isEmpty(nearCellFinder(node, 'right', 'down')) && isWhite(node) !== isWhite(nearCellFinder(node, 'right', 'down'))) {
            highlightPath(nearCellFinder(nearCellFinder(node, 'right', 'down'), 'right', 'down'));
        }

    }
    function isTurnAvailable(node) {
        return isWhite(node) === currentTurn.classList.contains('whiteTurn');
    }
    function highlight(node) {
        if (selectedCell) {
            selectedCell.classList.remove('highlight');
        }
        selectedCell = node;
        selectedCell.classList.add('highlight');
    }
    function highlightPath(node) {
        if (node.lastElementChild) return;
        node.classList.add('highlightAvailable');
    }
    function trashClick() {
        let trash = document.querySelector('.boardTrash');
        trash.onclick = function () {
            selectedCell.classList.remove('highlight');
            if (tempInnerHTML !== '') {
                trash.innerHTML += tempInnerHTML;
                tempInnerHTML = '';
                allNearCellsFinder(null, true);

            }
        }
    }
}

new Checkers('place');