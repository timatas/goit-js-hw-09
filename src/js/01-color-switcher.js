const startBtn = document.querySelector('button[data-start]');
const colorBody = document.querySelector('body');
const stopBtn = document.querySelector('button[data-stop]');
stopBtn.setAttribute('disabled', true);
let timerId = null;

startBtn.addEventListener('click', onClickStart);
function onClickStart(evt) {
  timerId = setInterval(() => {
    colorBody.style.backgroundColor = `${getRandomHexColor()}`;
    startBtn.setAttribute('disabled', true);
    stopBtn.disabled = false;
  }, 1000);
}

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
