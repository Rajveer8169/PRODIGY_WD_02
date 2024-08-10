let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('lapsList');

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
    const currentTime = new Date().getTime();
    const timeElapsed = currentTime - startTime + elapsedTime;
    display.textContent = formatTime(timeElapsed);
}

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime += new Date().getTime() - startTime;
        startStopButton.textContent = 'Start';
    } else {
        startTime = new Date().getTime();
        timer = setInterval(updateDisplay, 10);
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    startStopButton.textContent = 'Start';
    lapsList.innerHTML = '';
    lapTimes = [];
}

function addLap() {
    if (isRunning) {
        const lapTime = new Date().getTime() - startTime + elapsedTime;
        lapTimes.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = formatTime(lapTime);
        lapsList.appendChild(lapItem);
    }
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', addLap);
