import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');
startBtn.setAttribute('disabled', true);
startBtn.classList.add('timer-button');

const selectors = {
  day: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let idTimer = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      return Notify.failure('Please choose a date in the future');
    }
    startBtn.disabled = false;
    const msSelect = selectedDates[0].getTime();
    const msData = new Date().getTime();
    let msPeriod = msSelect - msData;

    startBtn.addEventListener('click', onClickStart);
    function onClickStart(evt) {
      this.idTimer = setInterval(() => {
        if (msPeriod <= 1000) {
          clearInterval(idTimer);
          this.idTimer = null;
          startBtn.disabled = true;
          return;
        }

        msPeriod -= 1000;
        convertMs(msPeriod);
      }, 1000);
    }
  },
};

flatpickr('input#datetime-picker', options);
const fp = document.querySelector('input#datetime-picker')._flatpickr;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  if (ms !== 0) {
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    selectors.day.textContent = addLeadingZero(`${days}`);
    selectors.hours.textContent = addLeadingZero(`${hours}`);
    selectors.minutes.textContent = addLeadingZero(`${minutes}`);
    selectors.seconds.textContent = addLeadingZero(`${seconds}`);

    function addLeadingZero(value) {
      return value.padStart(2, '0');
    }
    return { days, hours, minutes, seconds };
  }
  return;
}
