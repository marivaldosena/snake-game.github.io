const RIGHT = "right";
const LEFT = "left";
const UP = "up";
const DOWN = "down";

let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let game = null;
let box = 32;
let direction = RIGHT;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * 15 + 1) * box;
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function update(event) {
    if (event.keyCode === 37 && direction !== RIGHT) {
        direction = LEFT;
    }

    if (event.keyCode === 38 && direction !== DOWN) {
        direction = UP;
    }

    if (event.keyCode === 39 && direction !== LEFT) {
        direction = RIGHT
    }

    if (event.keyCode === 40 && direction !== UP) {
        direction = DOWN;
    }
}

function resetSnakePositionIfConstraintsWereTrespassed() {
    // Check box constraints and reset values, if necessary
    if (snake[0].x > 15 * box && direction === RIGHT) {
        snake[0].x = 0;
    }

    if (snake[0].x < 0 && direction === LEFT) {
        snake[0].x = 16 * box;
    }

    if (snake[0].y > 15 * box && direction === DOWN) {
        snake[0].y = 0;
    }

    if (snake[0].y < 0 && direction === UP) {
        snake[0].y = 16 * box;
    }
}

function checkCollisionAndResetGameIfNecessary() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            clearInterval(game);
            alert("Game Over :(");
        }
    }
}

function startGame() {
    resetSnakePositionIfConstraintsWereTrespassed();
    checkCollisionAndResetGameIfNecessary();

    createBG();
    createSnake();
    drawFood();

    // Move snake direction
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    switch (direction) {
        case RIGHT:
            snakeX += box;
            break;
        case LEFT:
            snakeX -= box;
            break;
        case UP:
            snakeY -= box;
            break;
        case DOWN:
            snakeY += box;
            break;
        default:
            break;
    }

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = getRandomNumber();
        food.y = getRandomNumber();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

document.addEventListener("DOMContentLoaded", function() {
    game = setInterval(startGame, 100);
});

document.addEventListener("keydown", update);
