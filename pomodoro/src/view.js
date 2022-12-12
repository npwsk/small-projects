export const updateTimeLeft = (containers, seconds) => {
  console.log(Math.floor(seconds / 60), seconds % 60);
  containers.minutesLeft.textContent = Math.floor(seconds / 60);
  containers.secondsLeft.textContent = (seconds % 60).toString().padStart(2, '0');
};

export const updateTimer = (containers, timerState) => {
  switch (timerState) {
    case 'idle': {
      containers.startButton.textContent = 'start';
      break;
    }
    case 'started': {
      containers.startButton.textContent = 'stop';
      break;
    }
    case 'stopped': {
      containers.startButton.textContent = 'start';
      break;
    }
    default:
  }
};
