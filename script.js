let speed = 0;
let happy = 100;
let position = 10;
let running = false;
let failure = null;
let moveTimer = null;
let failureTimer = null;

const speedText = document.getElementById("speed");
const happyText = document.getElementById("happy");
const messageText = document.getElementById("message");
const train = document.getElementById("train");

function updateScreen() {
  speedText.textContent = speed;
  happyText.textContent = happy;
  train.style.left = position + "px";
}

function startTrain() {
  if (failure !== null) {
    messageText.textContent = "고장 발생! 먼저 정비사를 불러야 합니다.";
    return;
  }

  running = true;
  speed = 80;
  messageText.textContent = "운행 중입니다.";

  clearInterval(moveTimer);
  moveTimer = setInterval(() => {
    if (running) {
      position += 10;
      if (position > 620) {
        position = 10;
      }
      updateScreen();
    }
  }, 300);

  clearTimeout(failureTimer);
  failureTimer = setTimeout(makeFailure, 4000);
  updateScreen();
}

function stopTrain() {
  running = false;
  speed = 0;
  messageText.textContent = "열차가 정지했습니다.";
  updateScreen();
}

function makeFailure() {
  if (!running) return;

  const failures = ["electric", "wheel", "engine"];
  failure = failures[Math.floor(Math.random() * failures.length)];

  running = false;
  speed = 0;

  if (failure === "electric") {
    messageText.textContent = "⚠️ 전기 문제 발생! 전기 정비공이 필요합니다.";
  } else if (failure === "wheel") {
    messageText.textContent = "⚠️ 바퀴 문제 발생! 바퀴 정비공이 필요합니다.";
  } else if (failure === "engine") {
    messageText.textContent = "⚠️ 엔진 문제 발생! 엔진 정비공이 필요합니다.";
  }

  updateScreen();
}

function callMechanic(type) {
  if (failure === null) {
    messageText.textContent = "현재 고장이 없습니다.";
    return;
  }

  if (type === failure) {
    messageText.textContent = "✅ 수리 완료! 다시 출발할 수 있습니다.";
    failure = null;
  } else {
    happy -= 20;
    if (happy < 0) happy = 0;
    messageText.textContent = "❌ 잘못된 정비공입니다. 승객 만족도가 떨어졌습니다.";

    if (happy === 0) {
      messageText.textContent = "게임 오버! 승객 만족도가 0이 되었습니다.";
      running = false;
      speed = 0;
    }
  }

  updateScreen();
}

updateScreen();