import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let interval;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const startBtn = document.querySelector('[data-start]');
    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
    clearInterval(interval);
  },
});

document.querySelector('[data-start]').addEventListener('click', () => {
  const selectedDataValue = document.getElementById('datatime-picker').value;
  const selectedDate = flatpickr.parseDate(selectedDataValue, 'Y-m-d H:i');

  if (!selectedDate) {
    alert('Please select a valid date and time');
    return;
  }

  clearInterval(interval);
  interval = setInterval(() => {
    const now = new Date();
    const difference = selectedDate - now;
    if (difference <= 0) {
      clearInterval(interval);
      Notiflix.Notify.success('Countdown finished');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(difference);
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent =
      addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent =
      addLeadingZero(seconds);
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / hour);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minute, seconds };
}

function addLeadingZero(value) {
  return value < 10 ? '0' + value : value;
}
