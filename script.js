let timer;
let isRunning = false;
let startTime;
let lapCount = 1;

function startPause() {
    const startPauseBtn = document.getElementById('startPause');

    if (!isRunning) {
        startTime = new Date() - lapCount * 10; 
        timer = setInterval(updateDisplay, 10);
        startPauseBtn.textContent = 'Pause';
        isRunning = true;
    } else {
        clearInterval(timer);
        startPauseBtn.textContent = 'Resume';
        isRunning = false;
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById('startPause').textContent = 'Start';
    document.getElementById('display').textContent = '00:00:00';
    document.getElementById('laps').innerHTML = '';
    lapCount = 1;
}

function lap() {
    if (isRunning) {
        const lapTime = calculateLapTime();
        const lapList = document.getElementById('laps');
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapList.appendChild(lapItem);
        lapCount++;
    }
}

function updateDisplay() {
    const currentTime = new Date();
    const elapsedTime = new Date(currentTime - startTime);
    const display = document.getElementById('display');
    const hours = pad(elapsedTime.getUTCHours());
    const minutes = pad(elapsedTime.getUTCMinutes());
    const seconds = pad(elapsedTime.getUTCSeconds());

    display.textContent = `${hours}:${minutes}:${seconds}`;
}

function calculateLapTime() {
    const currentTime = new Date();
    const elapsedTime = new Date(currentTime - startTime);
    const minutes = pad(elapsedTime.getUTCMinutes());
    const seconds = pad(elapsedTime.getUTCSeconds());
    const milliseconds = pad(elapsedTime.getUTCMilliseconds(), 3);

    return `${minutes}:${seconds}.${milliseconds}`;
}

function pad(value, length = 2) {
    return value.toString().padStart(length, '0');
}
