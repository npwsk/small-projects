export const handleTimerToggleClick = (state) => () => {
  const stopTimer = () => clearTimeout(state.timerId);

  const startTimer = (interval) => {
    let left = interval;
    while (left > 0) {
      setTimeout(() => {
        state.timeMsLeft -= 1000;
      }, 1000);
    }
  };

  switch (state.timerState) {
    case 'idle':
    case 'stopped': {
      state.timeMsLeft = state.workMsCount;
      state.timerId = setTimeout(stopTimer, state.workInterval);
      break;
    }
    case 'started': {
      stopTimer();
      break;
    }
    default:
  }
};

