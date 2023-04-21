const RANDOM_QUOTE_API = "http://api.quotable.io/random";

const quoteDisplayEl = document.getElementById("quoteDisplay");
const quoteInputEl = document.getElementById("quoteInput");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");

quoteInputEl.addEventListener("input", () => {
  const quoteArray = quoteDisplayEl.querySelectorAll("span");
  const valueArray = quoteInputEl.value.split("");
  const correct = true;
  quoteArray.forEach((characterSpan, index) => {
    const character = valueArray[index];
    if (character === null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    }
    if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });
  if (correct) renderNewQuote();
});

function getRandomQuotes() {
  return fetch(RANDOM_QUOTE_API)
    .then((res) => res.json())
    .then((data) => data.content);
}

async function renderNewQuote() {
  const quote = await getRandomQuotes();
  quoteDisplayEl.innerHTML = "";
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplayEl.appendChild(characterSpan);
  });
  quoteInputEl.value = null;
  startTimer();
}
let startTime;
function startTimer() {
  timerEl.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timerEl.innerText = getTimerTime();
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

renderNewQuote();
