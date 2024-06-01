let startTime;
let updatedTime;
let difference = 0;
let timerInterval;
let running = false;
let laps = JSON.parse(localStorage.getItem('laps')) || [];

const timeDisplay = document.querySelector('.time-display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const clearLapsBtn = document.getElementById('clearLapsBtn');
const splitBtn = document.getElementById('splitBtn');
const lapsList = document.querySelector('.laps');

function startTimer() {
  startTime = new Date().getTime() - difference;
  timerInterval = setInterval(function () {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    timeDisplay.innerHTML = formatTime(difference);
  }, 10);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  stopTimer();
  timeDisplay.innerHTML = '00:00:00.00';
  difference = 0;
  laps = [];
  saveLaps();
  renderLaps();
  startPauseBtn.innerHTML = 'Start';
  running = false;
}

function formatTime(time) {
  let milliseconds = parseInt((time % 1000) / 10);
  let seconds = parseInt((time / 1000) % 60);
  let minutes = parseInt((time / (1000 * 60)) % 60);
  let hours = parseInt((time / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function toggleTimer() {
  if (!running) {
    startTimer();
    startPauseBtn.innerHTML = 'Pause';
  } else {
    stopTimer();
    startPauseBtn.innerHTML = 'Start';
  }
  running = !running;
}

function recordLap() {
  if (running) {
    laps.push(formatTime(difference));
    saveLaps();
    renderLaps();
  }
}

function clearLaps() {
  laps = [];
  saveLaps();
  renderLaps();
}

function recordSplit() {
  if (running) {
    laps.push('Split: ' + formatTime(difference));
    saveLaps();
    renderLaps();
  }
}

function renderLaps() {
  lapsList.innerHTML = '';
  laps.forEach((lap, index) => {
    const li = document.createElement('li');
    li.innerHTML = `Lap ${index + 1}: ${lap}`;
    lapsList.appendChild(li);
  });
}

function saveLaps() {
  localStorage.setItem('laps', JSON.stringify(laps));
}

// Initialize laps on page load
renderLaps();

startPauseBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
clearLapsBtn.addEventListener('click', clearLaps);
splitBtn.addEventListener('click', recordSplit);
