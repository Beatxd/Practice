// Глобальные переменные
var FIELD_SIZE_X = 20;
var FIELD_SIZE_Y = 20;
var SNAKE_SPEED = 300; // Интервал между перемещениями змейки
var snake = []; // Сама змейка
var direction = 'y+'; // Напрвление движения змейки
var oldDirection = 'y+'; // Старое напрвление движения змейки
var gameIsRunnig = false; // Запущениа ли игра
var snake_timer; // Таймер змейки
var score = 0; // Результат

// Генерация поля
prepareGameField();

var wrap = document.getElementsByClassName('wrap')[0];
// Подгоняем размер контейнера под инровое поле
if (16 * (FIELD_SIZE_X + 1) < 200) {
    wrap.style.width = '200px';
}
else {
    wrap.style.width = (16 * (FIELD_SIZE_X + 1)).toString() + 'px';
}

// Событие кнопки Новая игра
document.getElementById('snake-new-game').addEventListener('click', startGame);
// Отслеживание клавиш клавиатуры
addEventListener('keydown', changeDirection);

/**
 * Функция генерации игрового поля
 */
function prepareGameField() {
    // Создаём таблицу
    var game_table = document.createElement('table');
    game_table.classList.add('game-table');
    // Генерация таблицы
    for (var i = 0; i < FIELD_SIZE_Y; i++) {
        // Создаём строки
        var row = document.createElement('tr');
        for (var j = 0; j < FIELD_SIZE_X; j++) {
            // Создаём ячейки
            var cell = document.createElement('td');
            cell.className = 'game-table-cell cell-' + i + '-' + j;
            row.appendChild(cell);
        }
        game_table.appendChild(row);
    }
    document.getElementById('snake-field').appendChild(game_table);
}

/**
 * Старт игры
 */
function startGame() {
    // Игра началась
    gameIsRunnig = true;
    // Сброс предыдущей игры
    direction = 'y+'; // Напрвление движения змейки
    oldDirection = 'y+'; // Старое напрвление движения змейки
    score = 0; // Результат
    for (var i = 0; i < snake.length; i++) {
        snake[i].classList.remove('snake-unit');
    }
    snake = [];
    var food = document.querySelectorAll('.food-unit');
    for (i = 0; i < food.length; i++) {
        food[i].classList.remove('food-unit');
    }
    // начало новой игры
    clearInterval(snake_timer);
    respawn();
    snake_timer = setInterval(move, SNAKE_SPEED);
    setTimeout(createFood, 5000);
}
/**
 * Функция расположения змейки на игровом поле
 */
function respawn() {
    // respawn из центра
    var start_coord_x = Math.floor(FIELD_SIZE_X / 2);
    var start_coord_y = Math.floor(FIELD_SIZE_Y / 2);

    // Голова змейки
    var snake_head = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
    snake_head.classList.add('snake-unit');
    snake_head.setAttribute('data_x', start_coord_x.toString());
    snake_head.setAttribute('data_y', start_coord_y.toString());
    // Тело змейки
    var snake_tail = document.getElementsByClassName('cell-' + (start_coord_y + 1) + '-' + start_coord_x)[0];
    snake_tail.classList.add('snake-unit');
    snake.push(snake_tail);
    snake.push(snake_head);
}

/**
 * Движение змейки
 */
function move() {
    var new_unit; // Новый элемент
    var coord_x = parseInt(snake[snake.length - 1].getAttribute('data_x'));
    var coord_y = parseInt(snake[snake.length - 1].getAttribute('data_y'));
    // Определяем новую точку
    switch (direction) {
        case 'x-':
            new_unit = document.querySelector('.cell-' + (coord_y) + '-' + (coord_x -= 1));
            break;
        case 'x+':
            new_unit = document.querySelector('.cell-' + (coord_y) + '-' + (coord_x += 1));
            break;
        case 'y-':
            new_unit = document.querySelector('.cell-' + (coord_y += 1) + '-' + (coord_x));
            break;
        case 'y+':
            new_unit = document.querySelector('.cell-' + (coord_y -= 1) + '-' + (coord_x));
            break;
    }
    // Проверка что new_unit не часть змейки и не выход за границы
    if (snake.indexOf(new_unit) === -1 && new_unit !== null) {
        // Добавление новой части змейки
        snake[snake.length - 1].removeAttribute('data_y');
        snake[snake.length - 1].removeAttribute('data_x');
        new_unit.classList.add('snake-unit');
        snake.push(new_unit);
        snake[snake.length - 1].setAttribute('data_x', coord_x.toString());
        snake[snake.length - 1].setAttribute('data_y', coord_y.toString());
        // Проверяем, надо ли убрать хвост
        if (!haveFood(new_unit)) {
            // Убираем хвост
            snake.splice(0, 1)[0].classList.remove('snake-unit');
        }
    }
    else {
        finishGame();
    }
    oldDirection = direction;
}

/**
 * Проверка на еда
 * @param unit
 * @returns {boolean}
 */
function haveFood(unit) {
    if (unit.classList.contains('food-unit')) {
        unit.classList.remove('food-unit');
        createFood();
        score++;
        return true;
    }
    return false;
}

/**
 * Создание еды
 */
function createFood() {
    var foodCreated = false;
    while (!foodCreated) {
        // Рандом
        var food_x = Math.floor(Math.random() * FIELD_SIZE_X);
        var food_y = Math.floor(Math.random() * FIELD_SIZE_Y);
        // Проверка на змейку
        var food_cell = document.querySelector('.cell-' + food_y + '-' + food_x);
        if (!food_cell.classList.contains('snake-unit')) {
            food_cell.classList.add('food-unit');
            foodCreated = true;
        }
    }
}

/**
 * Изменение напрвления движения змейки
 * @param e
 */
function changeDirection(e) {
    switch (e.keyCode) {
        case 37: // Клавиша влево
            if (oldDirection !== 'x+') {
                direction = 'x-'
            }
            break;
        case 38: // Клавиша вверх
            if (oldDirection !== 'y-') {
                direction = 'y+'
            }
            break;
        case 39: // Клавиша вправо
            if (oldDirection !== 'x-') {
                direction = 'x+'
            }
            break;
        case 40: // Клавиша вниз
            if (oldDirection !== 'y+') {
                direction = 'y-'
            }
            break;
    }
}

/**
 * Функция завершения игры
 */
function finishGame() {
    gameIsRunnig = false;
    clearInterval(snake_timer);
    alert('Вы проиграли!\nВаш результат: '+score.toString());
}