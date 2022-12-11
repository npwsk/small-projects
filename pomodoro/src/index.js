import { handleTimerToggleClick } from './timer';
import '../styles/index.css';

const DEFAULT_WORK_INTERVAL_MS = 25 * 60 * 60 * 1000;
const DEFAULT_REST_INTERVAL_MS = 5 * 60 * 60 * 1000;
const TIMER_STATE_IDLE = 'idle';
const TIMER_STATE_STARTED = 'started';
const TIMER_STATE_STOPPED = 'stopped';

const app = () => {
  const state = {
    timerState: TIMER_STATE_IDLE, // 'idle' | 'started' | 'stopped',
    timerId: null,
    timeMsLeft: 0,
    workMsCount: DEFAULT_WORK_INTERVAL_MS,
    restMsCount: DEFAULT_REST_INTERVAL_MS,
  };

  const containers = {
    startButton: document.getElementById('start-button'),
    settingsButton: document.getElementById('settings-button'),
    minutesLeft: document.getElementById('time-amount-minutes'),
    secondsLeft: document.getElementById('time-amount-seconds'),
  };

  containers.startButton.addEventListener('click', handleTimerToggleClick(state));
};
