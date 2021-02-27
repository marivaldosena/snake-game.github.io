const RIGHT = "right";
const LEFT = "left";
const UP = "up";
const DOWN = "down";

let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let direction = RIGHT;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
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

function startGame() {
    createBG();
    createSnake();

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
        default: break;
    }

    snake.pop();

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

document.addEventListener("DOMContentLoaded", function() {
    let game = setInterval(startGame, 100);
});

document.addEventListener("keydown", update);
