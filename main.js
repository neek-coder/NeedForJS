const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');

car.classList.add('car'); //Adding car class

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrorRight: false,
};

const gameData = {
    started: false,
    score: 0,
    speed: 5,
    traffic: 3,
    x: 0,
    y: 0,
};

function getMaxElementsCountOnScreenByHeight(elementHeight) {
    return Math.floor(document.documentElement.clientHeight / elementHeight) + 1;
}

function startGame() {
    start.classList.add('hidden');
    gameData.started = true;

    for (let i = 0; i < getMaxElementsCountOnScreenByHeight(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }

    for (let i = 0; i < getMaxElementsCountOnScreenByHeight(100 * gameData.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * gameData.traffic * (i + 1);
        enemy.style.opacity = '0;'
        enemy.style.left = Math.floor((Math.random()) * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        gameArea.appendChild(enemy);
    }

    gameArea.appendChild(car);

    gameData.x = car.offsetLeft;
    gameData.y = car.offsetTop;

    requestAnimationFrame(moveCar);
};

function animateRoad() {
    const lines = document.querySelectorAll('.line');
    lines.forEach(function (line) {
        if (line.y >= document.documentElement.clientHeight) line.y = -100;
        else line.y += gameData.speed;

        line.style.top = line.y + 'px';
    });
}

function animateEnemies() {
    const enemies = document.querySelectorAll('.enemy');
    enemies.forEach(function (enemy) {
        if (enemy.y >= document.documentElement.clientHeight) {
            enemy.y = -100;
            enemy.style.left = Math.floor((Math.random()) * (gameArea.offsetWidth - 50)) + 'px';
        }
        else enemy.y += gameData.speed / 2;

        enemy.style.top = enemy.y + 'px';
    });
}

function moveCar() {
    if (gameData.started) {
        animateRoad();
        animateEnemies();
        if (keys.ArrowLeft && gameData.x > 0) gameData.x -= gameData.speed;
        if (keys.ArrowRight && (gameData.x < (gameArea.offsetWidth - car.offsetWidth))) gameData.x += gameData.speed;
        if (keys.ArrowUp && gameData.y > 0) gameData.y -= 0.5 * gameData.speed;
        if (keys.ArrowDown && (gameData.y < (gameArea.offsetHeight - car.offsetHeight))) gameData.y += gameData.speed;

        car.style.left = gameData.x + 'px';
        car.style.top = gameData.y + 'px';

        requestAnimationFrame(moveCar);
    }
}

function startRun(event) {
    event.preventDefault();
    keys[event.key] = true;
};

function stopRun(event) {
    event.preventDefault();
    console.log(keys);
    keys[event.key] = false;
};