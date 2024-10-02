const goat = document.getElementById('goat');
const fruit = document.getElementById('fruit');
const knife = document.getElementById('knife');
const scoreDisplay = document.getElementById('score');
let score = 0;
let goatPosition = 125; // Starting position of the goat
let gameInterval;
let gameSpeed = 5; // Speed of object movement

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && goatPosition > 0) {
        goatPosition -= 20;
    } else if (event.key === 'ArrowRight' && goatPosition < 250) {
        goatPosition += 20;
    }
    goat.style.left = `${goatPosition}px`;
});

function startGame() {
    // Place initial objects randomly
    resetObject(fruit, 'fruit');
    resetObject(knife, 'knife');

    gameInterval = setInterval(() => {
        moveObject(fruit, 'fruit');
        moveObject(knife, 'knife');
        checkCollision();
    }, 20);
}

function moveObject(object, type) {
    let objectTop = parseInt(window.getComputedStyle(object).getPropertyValue('top'));

    if (objectTop >= 600) { // If object goes off the screen, reset it
        resetObject(object, type);
    } else {
        object.style.top = `${objectTop + gameSpeed}px`;
    }
}

function resetObject(object, type) {
    object.style.top = '-50px'; // Start off screen at the top
    object.style.left = `${Math.floor(Math.random() * 270)}px`; // Random X position
}

function checkCollision() {
    let goatRect = goat.getBoundingClientRect();
    let fruitRect = fruit.getBoundingClientRect();
    let knifeRect = knife.getBoundingClientRect();

    // Check collision with fruit
    if (goatRect.left < fruitRect.right &&
        goatRect.right > fruitRect.left &&
        goatRect.top < fruitRect.bottom &&
        goatRect.bottom > fruitRect.top) {
        score++;
        scoreDisplay.textContent = score;
        resetObject(fruit, 'fruit');
    }

    // Check collision with knife
    if (goatRect.left < knifeRect.right &&
        goatRect.right > knifeRect.left &&
        goatRect.top < knifeRect.bottom &&
        goatRect.bottom > knifeRect.top) {
        clearInterval(gameInterval);
        alert('Game Over! Your Score: ' + score);
        window.location.reload();
    }
}

startGame();