const startInterval = (state, currentIntervalLen) => {
  const step = (expectedEndTime, intervalMs) => {
    const dt = expectedEndTime - Date.now();
    if (dt < intervalMs) {
      state.secondsLeft = 0;
      const newIntervalLen = switchInterval(state);
      startInterval(state, newIntervalLen);
      return;
    }
    state.secondsLeft = Math.floor(dt / 1000);
    state.timerId = setTimeout(step, intervalMs, expectedEndTime, intervalMs);
  };

  state.timerState = 'started';

  const expectedEndTime = Date.now() + currentIntervalLen * 1000;
  const timerInterval = 1000;
  state.timerId = setTimeout(step, timerInterval, expectedEndTime, timerInterval);
};

const stopInterval = (state) => {
  state.timerState = 'stopped';

  clearTimeout(state.timerId);
};

const switchInterval = (state) => {
  switch (state.currentInterval) {
    case 'work':
      state.currentInterval = 'rest';
      state.secondsLeft = state.settings.restSecondsTotal;
      return state.settings.restSecondsTotal;
    case 'rest':
      state.currentInterval = 'work';
      state.secondsLeft = state.settings.workSecondsTotal;
      return state.settings.workSecondsTotal;
    default:
  }
};

export const handleTimerToggleClick = (state) => () => {
  switch (state.timerState) {
    case 'idle':
    case 'stopped': {
      startInterval(state, state.secondsLeft);
      break;
    }
    case 'started': {
      stopInterval(state);
      break;
    }
    default:
  }

  return () => stopInterval(state);
};
