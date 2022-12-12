import { handleTimerToggleClick } from './timer';
import { updateTimeLeft, updateTimer } from './view';
import onChange from 'on-change';
import '../styles/index.css';

const DEFAULT_WORK_INTERVAL_S = 25 * 60;
const DEFAULT_REST_INTERVAL_S = 5 * 60;
// const DEFAULT_WORK_INTERVAL_S = 30;
// const DEFAULT_REST_INTERVAL_S = 10;
const TIMER_STATE = {
  idle: 'idle',
  inProgress: 'inProgress',
  stopped: 'stopped',
};

const INTERVAL_TYPE = {
  work: 'work',
  rest: 'rest'
}

const initTimer = (containers, state) => {
  updateTimeLeft(containers, state.secondsLeft);
};

const app = () => {
  const state = {
    timerId: null,
    timerState: TIMER_STATE.idle,
    currentInterval: INTERVAL_TYPE.work,
    secondsLeft: DEFAULT_WORK_INTERVAL_S,
    settings: {
      workSecondsTotal: DEFAULT_WORK_INTERVAL_S,
      restSecondsTotal: DEFAULT_REST_INTERVAL_S
    },
  };

  const watchedState = onChange(state, (path, value, previousValue, applyData) => {
    console.log('this:', this);
    console.log('path:', path);
    console.log('value:', value);
    console.log('previousValue:', previousValue);
    console.log('applyData:', applyData);
    if (path === 'secondsLeft') {
      updateTimeLeft(containers, value);
    }
    if (path === 'timerState') {
      updateTimer(containers, value);
    }
  });

  const containers = {
    startButton: document.getElementById('start-button'),
    settingsButton: document.getElementById('settings-button'),
    minutesLeft: document.getElementById('time-amount-minutes'),
    secondsLeft: document.getElementById('time-amount-seconds'),
  };

  const cleanUpTimer = containers.startButton.addEventListener(
    'click',
    handleTimerToggleClick(watchedState)
  );

  initTimer(containers, state);

  return () => {
    cleanUpTimer();
  };
};

const cleanUp = app();

window.addEventListener('unload', cleanUp);
