let speed = 0;
let happy = 100;
let score = 0;
let running = false;
let currentFailure = null;
let moveTimer = null;
let failureTimer = null;
let failureCount = 0;
let angle = 0;

const speedText = document.getElementById("speed");
const happyText = document.getElementById("happy");
const scoreText = document.getElementById("score");
const failureCountText = document.getElementById("failureCount");
const messageText = document.getElementById("message");
const complaintText = document.getElementById("complaint");
const failureIcon = document.getElementById("failureIcon");
const train = document.getElementById("train");

const centerX = 480;
const centerY = 220;
const radiusX = 350;
const radiusY = 165;

const failures = [
  { type: "electric", icon: "⚡", name: "전기 계통 이상", message: "전기팀이 필요합니다.", complaints: ["불이 깜빡거려요!", "안내 방송이 끊겨요!", "충전기가 안 돼요!"] },
  { type: "electric", icon: "🔋", name: "배터리 방전", message: "전기팀을 호출하세요.", complaints: ["열차가 갑자기 멈췄어요!", "불이 꺼졌어요!", "왜 전기가 안 들어와요?"] },
  { type: "wheel", icon: "🛞", name: "바퀴 이상 진동", message: "바퀴팀이 필요합니다.", complaints: ["열차가 덜컹거려요!", "너무 흔들려요!", "소리가 이상해요!"] },
  { type: "wheel", icon: "🔥", name: "베어링 과열", message: "바퀴팀을 부르세요.", complaints: ["타는 냄새가 나요!", "창밖에 연기가 보여요!", "계속 달려도 괜찮나요?"] },
  { type: "engine", icon: "🛠️", name: "엔진 출력 저하", message: "엔진팀이 필요합니다.", complaints: ["열차가 너무 느려요!", "언제 도착하나요?", "속도가 자꾸 줄어요!"] },
  { type: "engine", icon: "🌡️", name: "엔진 온도 상승", message: "엔진팀을 호출하세요.", complaints: ["기계 소리가 커졌어요!", "열차가 힘들어 보여요!", "더 가도 괜찮나요?"] },
  { type: "brake", icon: "🧯", name: "브레이크 압력 저하", message: "브레이크팀이 필요합니다.", complaints: ["브레이크 소리가 커요!", "정차할 때 무서웠어요!", "갑자기 확 멈췄어요!"] },
  { type: "signal", icon: "🚦", name: "신호기 오류", message: "신호팀이 필요합니다.", complaints: ["왜 계속 기다려요?", "앞에 무슨 일이 있나요?", "신호가 안 바뀌어요!"] },
  { type: "aircon", icon: "❄️", name: "냉난방 고장", message: "냉난방팀이 필요합니다.", complaints: ["너무 추워요!", "너무 더워요!", "에어컨이 안 나와요!"] },
  { type: "door", icon: "🚪", name: "출입문 오류", message: "출입문팀이 필요합니다.", complaints: ["문이 안 닫혀요!", "문에서 삐 소리가 나요!", "출발해도 괜찮나요?"] }
];

function updateTrainPosition() {
  const rad = angle * Math.PI / 180;
  const x = centerX + radiusX * Math.cos(rad);
  const y = centerY + radiusY * Math.sin(rad);

  const nextRad = (angle + 3) * Math.PI / 180;
  const nextX = centerX + radiusX * Math.cos(nextRad);
  const nextY = centerY + radiusY * Math.sin(nextRad);

  const rotation = Math.atan2(nextY - y, nextX - x) * 180 / Math.PI;

  train.style.left = (x - 65) + "px";
  train.style.top = (y - 24) + "px";
  train.style.transform = `rotate(${rotation}deg)`;
}

function updateScreen() {
  speedText.textContent = speed;
  happyText.textContent = happy;
  scoreText.textContent = score;
  failureCountText.textContent = failureCount;
  updateTrainPosition();
}

function startTrain() {
  if (happy <= 0) {
    messageText.textContent = "게임이 끝났습니다. 다시 시작을 눌러주세요.";
    return;
  }

  if (currentFailure !== null) {
    messageText.textContent = "고장 발생! 먼저 알맞은 정비팀을 부르세요.";
    return;
  }

  running = true;
  speed = 180;
  messageText.textContent = "KTX 산천이 운행 중입니다.";
  complaintText.textContent = "승객들이 편안하게 이동 중입니다.";
  failureIcon.textContent = "🚄";

  clearInterval(moveTimer);
  moveTimer = setInterval(() => {
    if (running) {
      angle += 3;
      if (angle >= 360) {
        angle = 0;
        score += 10;
      }
      updateScreen();
    }
  }, 90);

  clearTimeout(failureTimer);
  failureTimer = setTimeout(makeFailure, randomTime());

  updateScreen();
}

function stopTrain() {
  running = false;
  speed = 0;
  messageText.textContent = "열차가 정지했습니다.";
  failureIcon.textContent = "⏹️";
  updateScreen();
}

function emergencyBrake() {
  running = false;
  speed = 0;
  happy -= 5;
  if (happy < 0) happy = 0;
  messageText.textContent = "비상제동을 사용했습니다!";
  complaintText.textContent = "승객: 갑자기 멈춰서 놀랐어요!";
  failureIcon.textContent = "🚨";
  updateScreen();
}

function randomTime() {
  return Math.floor(Math.random() * 5000) + 4000;
}

function makeFailure() {
  if (!running) return;

  currentFailure = failures[Math.floor(Math.random() * failures.length)];

  running = false;
  speed = 0;
  failureCount += 1;

  const randomComplaint =
    currentFailure.complaints[Math.floor(Math.random() * currentFailure.complaints.length)];

  failureIcon.textContent = currentFailure.icon;
  messageText.textContent = "⚠️ " + currentFailure.name + " - " + currentFailure.message;
  complaintText.textContent = "승객: " + randomComplaint;

  updateScreen();
}

function callMechanic(type) {
  if (currentFailure === null) {
    messageText.textContent = "현재 고장이 없습니다.";
    complaintText.textContent = "승객: 지금은 괜찮아요!";
    failureIcon.textContent = "✅";
    return;
  }

  if (type === currentFailure.type) {
    score += 20;
    happy += 10;
    if (happy > 100) happy = 100;

    messageText.textContent = "✅ 수리 완료! 다시 출발할 수 있습니다.";
    complaintText.textContent = "승객: 다행이에요! 고마워요!";
    failureIcon.textContent = "😊";

    currentFailure = null;
  } else {
    happy -= 20;
    if (happy < 0) happy = 0;

    messageText.textContent = "❌ 잘못된 정비팀입니다!";
    complaintText.textContent = "승객: 아직 문제가 해결되지 않았어요!";
    failureIcon.textContent = "😢";
  }

  updateScreen();
}

function resetGame() {
  speed = 0;
  happy = 100;
  score = 0;
  running = false;
  currentFailure = null;
  failureCount = 0;
  angle = 0;

  clearInterval(moveTimer);
  clearTimeout(failureTimer);

  messageText.textContent = "대기 중입니다.";
  complaintText.textContent = "아직 컴플레인이 없습니다.";
  failureIcon.textContent = "✅";

  updateScreen();
}

updateScreen();
