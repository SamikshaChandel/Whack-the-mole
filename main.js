const cursor = document.querySelector('.cursor');
const holes = [...document.querySelectorAll('.hole')];
const scoreEl = document.querySelector('.score span');
const timerBox = document.getElementById('timerBox');
const timerEl = document.getElementById('timer');
const resultDiv = document.querySelector('.result');
const restartButton = document.getElementById('restartButton');
const container = document.getElementById('board');
let score = 0;
let timeLeft = 20;
const sound = new Audio("assets/smash.mp3");

function startTimer() {
    const timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            displayResult();
        }
    }, 1000);
}

function displayResult() {
    const winSound = new Audio("assets/win.mp3");
    const loseSound = new Audio("assets/lose.mp3");

    if (score > 60) {
        winSound.play();
        resultDiv.innerHTML = '<h1>You won!</h1><img src="https://i.giphy.com/LlYjGi9rErbLjyaMNr.webp" width="400" height="400"></img></br><button id="restartButton">Restart</button>';
    } else {
        loseSound.play();
        resultDiv.innerHTML = '<h1>You Lost!</h1><img src="https://i.giphy.com/MRCR0QEgT2U6e9V83j.webp" width="480" height="270"></img></br><button id="restartButton">Restart</button>';
    }
    resultDiv.style.display = 'block';
    container.style.display = 'none';
    timerBox.style.display = 'none';

    
    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', () => {
        location.reload(); 
    });
}

function run(){
    const i = Math.floor(Math.random() * holes.length);
    const hole = holes[i];
    let timer = null;

    const img = document.createElement('img');
    img.classList.add('mole');
    img.src = 'assets/mole.png';

    img.addEventListener('click', () => {
        score += 10;
        sound.play();
        scoreEl.textContent = score;
        img.src = 'assets/mole-whacked.png';
        clearTimeout(timer);
        setTimeout(() => {
            hole.removeChild(img);
            run();
        }, 500);
    });

    hole.appendChild(img);

    timer = setTimeout(() => {
        hole.removeChild(img);
        run();
    }, 1500);
}

run();

window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
});

window.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});

window.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});

startTimer();
