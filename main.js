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

const settings = {
    started: false,
    score: 0,
    speed: 3,
};

function startGame() {
    start.classList.add('hidden');
    settings.start = true;
    gameArea.appendChild(car);
    requestAnimationFrame(playGame);
};

function playGame() {
    console.log('Playing...');
    if (settings.started) 
        requestAnimationFrame(playGame);
}

function startRun(event) {
    event.preventDefault();
    console.log(keys);
    keys[event.key] = true;
};

function stopRun(event) {
    event.preventDefault();
    console.log(keys);
    keys[event.key] = false;
};