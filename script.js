document.addEventListener("DOMContentLoaded", function () {

  /* ===================================================== */
  /* DOM */
  /* ===================================================== */

  const scoreText =
    document.getElementById("scoreText");

  const repairText =
    document.getElementById("repairText");

  const missionText =
    document.getElementById("missionText");

  const newMissionBtn =
    document.getElementById("newMissionBtn");

  const depotMessage =
    document.getElementById("depotMessage");

  const couplers =
    document.querySelectorAll(".coupler");

  const cars =
    document.querySelectorAll(".train-car");


  /* 연결기 모달 */

  const couplerModal =
    document.getElementById("couplerModal");

  const closeCouplerBtn =
    document.getElementById("closeCouplerBtn");

  const couplerTitle =
    document.getElementById("couplerTitle");

  const leftCarName =
    document.getElementById("leftCarName");

  const rightCarName =
    document.getElementById("rightCarName");

  const bigCoupler =
    document.getElementById("bigCoupler");

  const couplerStatus =
    document.getElementById("couplerStatus");

  const miniGameArea =
    document.getElementById("miniGameArea");


  /* 대화 */

  const talkModal =
    document.getElementById("talkModal");

  const talkCharacter =
    document.getElementById("talkCharacter");

  const talkIcon =
    document.getElementById("talkIcon");

  const talkTitle =
    document.getElementById("talkTitle");

  const talkQuestion =
    document.getElementById("talkQuestion");

  const talkChoices =
    document.getElementById("talkChoices");

  const talkFeedback =
    document.getElementById("talkFeedback");

  const speakArea =
    document.getElementById("speakArea");

  const speakText =
    document.getElementById("speakText");

  const speakDoneBtn =
    document.getElementById("speakDoneBtn");


  /* 성공 */

  const successModal =
    document.getElementById("successModal");

  const successCarText =
    document.getElementById("successCarText");

  const finishMissionBtn =
    document.getElementById("finishMissionBtn");


  /* ===================================================== */
  /* 상태 */
  /* ===================================================== */

  let score = 0;

  let repairs = 0;

  let currentMission = null;

  let selectedCoupler = null;

  let requiredCouplers = [];

  let completedCouplers = [];

  let currentMiniGame = "";

  let miniGameComplete = false;

  let currentTalk = null;


  /* ===================================================== */
  /* 차량 이름 */
  /* ===================================================== */

  const carNames = [
    "기관차",
    "1호차",
    "2호차",
    "3호차",
    "4호차",
    "5호차"
  ];


  /* ===================================================== */
  /* 정비 미션 */
  /* ===================================================== */

  const missions = [

    {
      car: 1,

      problem:
        "❄️ 1호차 냉방장치 점검",

      text:
        "1호차 냉방장치에 이상이 있어요. 1호차를 분리해 주세요.",

      required: [0,1]
    },

    {
      car: 2,

      problem:
        "🛞 2호차 바퀴 점검",

      text:
        "2호차 바퀴에서 이상한 소리가 들려요. 2호차를 분리해 주세요.",

      required: [1,2]
    },

    {
      car: 3,

      problem:
        "💡 3호차 전등 점검",

      text:
        "3호차 객실 조명이 깜빡여요. 3호차를 분리해서 정비고로 보내주세요.",

      required: [2,3]
    },

    {
      car: 4,

      problem:
        "🚪 4호차 출입문 점검",

      text:
        "4호차 출입문을 점검해야 해요. 4호차를 분리해 주세요.",

      required: [3,4]
    },

    {
      car: 5,

      problem:
        "🌡️ 5호차 온도센서 점검",

      text:
        "5호차 온도센서를 점검해야 해요. 마지막 객차를 분리해 주세요.",

      required: [4]
    },

    {
      car: 3,

      problem:
        "🔧 3호차 특별 정비",

      text:
        "정비팀에서 3호차 특별 검사를 요청했어요. 3호차만 분리해 주세요.",

      required: [2,3]
    },

    {
      car: 2,

      problem:
        "📡 2호차 통신장치 점검",

      text:
        "2호차의 통신장치를 확인해야 해요. 2호차를 분리해 주세요.",

      required: [1,2]
    }

  ];


  /* ===================================================== */
  /* 대화 문제 */
  /* ===================================================== */

  const talks = [

    {
      character:
        "👨 아빠 정비사",

      icon:
        "📡",

      title:
        "연결기가 잘 안 보여요",

      question:
        "아빠 정비사가 “팀장님, 어느 연결기를 확인해야 하는지 잘 모르겠습니다.”라고 말했어요.",

      choices: [
        "그것도 몰라?",
        "제가 다시 알려드릴게요. 해당 객차 양쪽 연결부를 확인해 주세요.",
        "그냥 아무거나 눌러요.",
        "알아서 하세요."
      ],

      answer: 1,

      feedback:
        "좋아요! 상대방이 이해하지 못했을 때 다시 구체적으로 설명했어요.",

      speech:
        "제가 다시 알려드릴게요. 해당 객차 양쪽 연결부를 확인해 주세요."
    },


    {
      character:
        "👧 이서 정비사",

      icon:
        "🔧",

      title:
        "이서가 도움을 요청해요",

      question:
        "이서가 “아준아, 이 부분이 어려운데 같이 봐줄래?”라고 물었어요.",

      choices: [
        "그것도 못해?",
        "응, 어떤 부분이 어려운지 같이 보자.",
        "나도 바빠.",
        "혼자 해."
      ],

      answer: 1,

      feedback:
        "좋아요! 먼저 어떤 부분이 어려운지 확인하면서 도움을 주기로 했어요.",

      speech:
        "응, 어떤 부분이 어려운지 같이 보자."
    },


    {
      character:
        "🧔 삼촌 정비사",

      icon:
        "⚠️",

      title:
        "삼촌이 이상한 점을 발견했어요",

      question:
        "삼촌이 “팀장님, 연결부 상태가 평소와 조금 다른 것 같습니다.”라고 보고했어요.",

      choices: [
        "그냥 계속하세요.",
        "어떤 점이 다른지 먼저 설명해 주세요.",
        "괜찮을 거예요.",
        "빨리 끝내세요."
      ],

      answer: 1,

      feedback:
        "맞아요! 문제가 있다는 보고를 들으면 어떤 점이 다른지 먼저 확인해야 해요.",

      speech:
        "어떤 점이 다른지 먼저 설명해 주세요."
    },


    {
      character:
        "👩 엄마 정비사",

      icon:
        "📋",

      title:
        "엄마가 지시를 확인해요",

      question:
        "엄마가 “아준 팀장님, 이번에는 몇 호차를 분리하면 되나요?”라고 물었어요.",

      choices: [
        "아까 말했잖아요.",
        "정비 지시서를 같이 확인해 볼게요.",
        "아무거나 분리하세요.",
        "모르겠어요."
      ],

      answer: 1,

      feedback:
        "좋아요! 기억이 다를 때는 정확한 정보를 함께 확인하는 것이 좋아요.",

      speech:
        "정비 지시서를 같이 확인해 볼게요."
    },


    {
      character:
        "👴 진주할아버지 정비사",

      icon:
        "👂",

      title:
        "무전을 잘 못 들었어요",

      question:
        "진주할아버지가 “아준아, 무전이 잘 안 들렸어.”라고 말씀하셨어요.",

      choices: [
        "아까 말했잖아요.",
        "네, 천천히 다시 말씀드릴게요.",
        "그냥 넘어가요.",
        "더 빠르게 말한다."
      ],

      answer: 1,

      feedback:
        "맞아요! 상대가 못 들었다면 다시 천천히 설명하면 좋아요.",

      speech:
        "네, 천천히 다시 말씀드릴게요."
    },


    {
      character:
        "👦 시환이 정비사",

      icon:
        "🤔",

      title:
        "시환이 생각은 달라요",

      question:
        "시환이가 “나는 다른 연결부부터 확인하는 게 좋을 것 같아.”라고 말했어요.",

      choices: [
        "내 방법이 무조건 맞아.",
        "왜 그렇게 생각했는지 말해줄래?",
        "안 돼.",
        "내 말대로 해."
      ],

      answer: 1,

      feedback:
        "좋아요! 생각이 다를 때 상대방의 이유를 먼저 물어봤어요.",

      speech:
        "시환아, 왜 그렇게 생각했는지 말해줄래?"
    },


    {
      character:
        "👧 예나 정비사",

      icon:
        "😊",

      title:
        "예나가 문제를 찾았어요",

      question:
        "예나가 오랫동안 살펴보다가 필요한 연결부를 정확하게 찾았어요.",

      choices: [
        "그건 쉬운 건데?",
        "예나야, 자세히 보고 잘 찾았네!",
        "내가 더 빨리 찾았어.",
        "다음 거 해."
      ],

      answer: 1,

      feedback:
        "좋아요! 상대방이 노력한 부분을 구체적으로 칭찬했어요.",

      speech:
        "예나야, 자세히 보고 잘 찾았네!"
    }

  ];


  /* ===================================================== */
  /* 랜덤 */
  /* ===================================================== */

  function randomItem(array) {

    return array[
      Math.floor(
        Math.random() *
        array.length
      )
    ];

  }


  /* ===================================================== */
  /* 새 임무 */
  /* ===================================================== */

  function startNewMission() {

    resetTrain();


    currentMission =
      randomItem(missions);


    requiredCouplers =
      [...currentMission.required];


    completedCouplers =
      [];


    missionText.textContent =
      currentMission.text;


    depotMessage.textContent =
      "🔍 " +
      carNames[currentMission.car] +
      "를 떼려면 어느 연결기를 분리해야 할까요?";


    cars.forEach(
      car => {

        car.classList.remove(
          "target-car"
        );

      }
    );


    const targetCar =
      document.querySelector(
        '[data-car="' +
        currentMission.car +
        '"]'
      );


    targetCar.classList.add(
      "target-car"
    );


    couplers.forEach(
      c => {

        c.classList.remove(
          "target",
          "disconnected"
        );

      }
    );

  }


  /* ===================================================== */
  /* 열차 초기화 */
  /* ===================================================== */

  function resetTrain() {

    cars.forEach(
      car => {

        car.classList.remove(
          "removed",
          "target-car"
        );

      }
    );


    couplers.forEach(
      coupler => {

        coupler.classList.remove(
          "disconnected",
          "target"
        );

        coupler.disabled =
          false;

      }
    );

  }


  /* ===================================================== */
  /* 연결기 클릭 */
  /* ===================================================== */

  function selectCoupler(index) {

    if (
      !currentMission
    ) {

      depotMessage.textContent =
        "📋 먼저 새 임무를 받아주세요!";

      return;

    }


    if (
      completedCouplers.includes(index)
    ) {

      depotMessage.textContent =
        "✅ 이미 분리한 연결기예요.";

      return;

    }


    /*
      엉뚱한 연결기를 선택하면
      정답을 바로 보여주지는 않음
    */

    if (
      !requiredCouplers.includes(index)
    ) {

      score =
        Math.max(
          0,
          score - 5
        );


      updateScore();


      depotMessage.textContent =
        "🤔 이 연결기를 분리하면 필요한 객차가 제대로 떨어질까요? 다시 생각해봐요!";


      const wrong =
        document.querySelector(
          '[data-coupler="' +
          index +
          '"]'
        );


      wrong.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-6px)" },
          { transform: "translateX(6px)" },
          { transform: "translateX(0)" }
        ],
        {
          duration: 350
        }
      );


      return;

    }


    selectedCoupler =
      index;


    openCouplerGame(index);

  }


  /* ===================================================== */
  /* 연결기 확대 */
  /* ===================================================== */

  function openCouplerGame(index) {

    const left =
      carNames[index];


    const right =
      carNames[index + 1];


    couplerTitle.textContent =
      left +
      " ↔ " +
      right;


    leftCarName.textContent =
      left;


    rightCarName.textContent =
      right;


    bigCoupler.textContent =
      "🔗";


    bigCoupler.style.opacity =
      "1";


    bigCoupler.style.transform =
      "scale(1)";


    couplerStatus.textContent =
      "🟢 연결 상태";


    miniGameComplete =
      false;


    couplerModal.classList.remove(
      "hidden"
    );


    /*
      랜덤 가상 연결기 퍼즐
    */

    const games = [
      "sequence",
      "inspection",
      "pressure"
    ];


    currentMiniGame =
      randomItem(games);


    if (
      currentMiniGame ===
      "sequence"
    ) {

      createSequenceGame();

    }


    if (
      currentMiniGame ===
      "inspection"
    ) {

      createInspectionGame();

    }


    if (
      currentMiniGame ===
      "pressure"
    ) {

      createPressureGame();

    }

  }


  /* ===================================================== */
  /* 미니게임 1 - 순서 */
  /* ===================================================== */

  function createSequenceGame() {

    miniGameArea.innerHTML = `
      <div class="mini-title">
        🧩 연결 준비 퍼즐
      </div>

      <div style="
        text-align:center;
        margin-bottom:8px;
        font-weight:800;
      ">
        화면의 안내 순서대로 준비 버튼을 눌러주세요.
      </div>

      <div class="mini-buttons">

        <button
          class="mini-btn"
          data-step="0"
        >
          🔵 상태 확인
        </button>

        <button
          class="mini-btn"
          data-step="1"
        >
          🟡 안전 확인
        </button>

        <button
          class="mini-btn"
          data-step="2"
        >
          🟢 분리 준비
        </button>

      </div>

      <div
        id="sequenceMessage"
        style="
          text-align:center;
          margin-top:9px;
          font-weight:900;
        "
      >
        ① 상태 확인부터!
      </div>
    `;


    let step =
      0;


    const buttons =
      miniGameArea.querySelectorAll(
        ".mini-btn"
      );


    const message =
      document.getElementById(
        "sequenceMessage"
      );


    buttons.forEach(
      button => {

        button.addEventListener(
          "click",
          function () {

            const clicked =
              Number(
                button.dataset.step
              );


            if (
              clicked ===
              step
            ) {

              button.classList.add(
                "done"
              );


              button.disabled =
                true;


              step++;


              if (
                step === 1
              ) {

                message.textContent =
                  "② 안전 확인!";

              }


              else if (
                step === 2
              ) {

                message.textContent =
                  "③ 분리 준비!";

              }


              else {

                message.textContent =
                  "✨ 준비 완료!";


                showSeparateButton();

              }

            }


            else {

              button.classList.add(
                "wrong"
              );


              setTimeout(
                function () {

                  button.classList.remove(
                    "wrong"
                  );

                },
                350
              );


              message.textContent =
                "🤔 순서를 다시 확인해봐요!";

            }

          }
        );

      }
    );

  }


  /* ===================================================== */
  /* 미니게임 2 - 상태 찾기 */
  /* ===================================================== */

  function createInspectionGame() {

    const correct =
      Math.floor(
        Math.random() *
        3
      );


    const labels = [
      "🔍 연결 상태",
      "💡 표시등",
      "🛡️ 안전 상태"
    ];


    miniGameArea.innerHTML = `
      <div class="mini-title">
        👀 이상 상태를 찾아라!
      </div>

      <div style="
        text-align:center;
        margin-bottom:8px;
        font-weight:800;
      ">
        ⚠️ 표시가 있는 부분을 찾아주세요.
      </div>

      <div
        id="inspectionButtons"
        class="mini-buttons"
      >
      </div>
    `;


    const container =
      document.getElementById(
        "inspectionButtons"
      );


    labels.forEach(
      function (label,index) {

        const btn =
          document.createElement(
            "button"
          );


        btn.className =
          "mini-btn";


        btn.innerHTML =
          label +
          "<br>" +
          (
            index === correct
              ? "⚠️"
              : "✅"
          );


        btn.addEventListener(
          "click",
          function () {

            if (
              index === correct
            ) {

              btn.classList.add(
                "done"
              );


              container
                .querySelectorAll(
                  "button"
                )
                .forEach(
                  b => b.disabled = true
                );


              showSeparateButton();

            }


            else {

              btn.classList.add(
                "wrong"
              );


              setTimeout(
                function () {

                  btn.classList.remove(
                    "wrong"
                  );

                },
                350
              );

            }

          }
        );


        container.appendChild(
          btn
        );

      }
    );

  }


  /* ===================================================== */
  /* 미니게임 3 - 게이지 */
  /* ===================================================== */

  function createPressureGame() {

    let position =
      Math.floor(
        Math.random() *
        7
      );


    if (
      position === 3
    ) {

      position =
        0;

    }


    miniGameArea.innerHTML = `
      <div class="mini-title">
        🎯 연결부 힘을 가운데로 맞춰요!
      </div>

      <div
        id="pressureGauge"
        class="pressure-gauge"
      >
      </div>

      <div
        id="pressureMarker"
        class="pressure-marker"
      >
      </div>

      <div class="move-controls">

        <button
          id="pressureLeft"
          class="action-btn"
        >
          ⬅️ 조금 이동
        </button>

        <button
          id="pressureRight"
          class="action-btn"
        >
          조금 이동 ➡️
        </button>

      </div>
    `;


    const gauge =
      document.getElementById(
        "pressureGauge"
      );


    for (
      let i = 0;
      i < 7;
      i++
    ) {

      const cell =
        document.createElement(
          "div"
        );


      cell.className =
        "pressure-cell";


      if (
        i === 3
      ) {

        cell.classList.add(
          "center"
        );

      }


      gauge.appendChild(
        cell
      );

    }


    const marker =
      document.getElementById(
        "pressureMarker"
      );


    const left =
      document.getElementById(
        "pressureLeft"
      );


    const right =
      document.getElementById(
        "pressureRight"
      );


    function render() {

      let display =
        "";


      for (
        let i = 0;
        i < 7;
        i++
      ) {

        display +=
          i === position
            ? "▲ "
            : "　 ";

      }


      marker.textContent =
        display;


      if (
        position === 3
      ) {

        left.disabled =
          true;


        right.disabled =
          true;


        marker.textContent =
          "🟢 딱 맞았어요!";


        showSeparateButton();

      }

    }


    left.addEventListener(
      "click",
      function () {

        if (
          position > 0
        ) {

          position--;

          render();

        }

      }
    );


    right.addEventListener(
      "click",
      function () {

        if (
          position < 6
        ) {

          position++;

          render();

        }

      }
    );


    render();

  }


  /* ===================================================== */
  /* 분리 버튼 */
  /* ===================================================== */

  function showSeparateButton() {

    if (
      miniGameComplete
    ) {

      return;

    }


    miniGameComplete =
      true;


    const button =
      document.createElement(
        "button"
      );


    button.className =
      "separate-btn";


    button.textContent =
      "🔗 철컥! 연결기 분리";


    button.addEventListener(
      "click",
      disconnectSelectedCoupler
    );


    miniGameArea.appendChild(
      button
    );

  }


  /* ===================================================== */
  /* 실제 분리 */
  /* ===================================================== */

  function disconnectSelectedCoupler() {

    bigCoupler.textContent =
      "✨";


    bigCoupler.style.transform =
      "scale(1.5)";


    couplerStatus.textContent =
      "🟡 연결기 해제 중...";


    setTimeout(
      function () {

        bigCoupler.textContent =
          "　";


        bigCoupler.style.opacity =
          "0";


        couplerStatus.textContent =
          "✅ 연결기 분리 완료!";


        const coupler =
          document.querySelector(
            '[data-coupler="' +
            selectedCoupler +
            '"]'
          );


        coupler.classList.add(
          "disconnected"
        );


        completedCouplers.push(
          selectedCoupler
        );


        score +=
          25;


        updateScore();


        setTimeout(
          function () {

            couplerModal.classList.add(
              "hidden"
            );


            checkMissionCompletion();

          },
          650
        );

      },
      550
    );

  }


  /* ===================================================== */
  /* 미션 완료 확인 */
  /* ===================================================== */

  function checkMissionCompletion() {

    const complete =
      requiredCouplers.every(
        index =>
          completedCouplers.includes(
            index
          )
      );


    if (
      complete
    ) {

      depotMessage.textContent =
        "🎉 필요한 연결기를 모두 분리했어요!";


      /*
        화용언어 문제
      */

      setTimeout(
        function () {

          openTalkMission();

        },
        550
      );

    }


    else {

      const remaining =
        requiredCouplers.length -
        completedCouplers.length;


      depotMessage.textContent =
        "👍 좋아요! 연결기를 " +
        remaining +
        "개 더 찾아야 해요.";

    }

  }


  /* ===================================================== */
  /* 화용언어 */
  /* ===================================================== */

  function openTalkMission() {

    currentTalk =
      randomItem(talks);


    talkCharacter.textContent =
      currentTalk.character;


    talkIcon.textContent =
      currentTalk.icon;


    talkTitle.textContent =
      currentTalk.title;


    talkQuestion.textContent =
      currentTalk.question;


    talkChoices.innerHTML =
      "";


    talkFeedback.classList.add(
      "hidden"
    );


    speakArea.classList.add(
      "hidden"
    );


    currentTalk.choices.forEach(
      function (choice,index) {

        const btn =
          document.createElement(
            "button"
          );


        btn.className =
          "talk-choice";


        btn.textContent =
          choice;


        btn.addEventListener(
          "click",
          function () {

            answerTalk(
              index,
              btn
            );

          }
        );


        talkChoices.appendChild(
          btn
        );

      }
    );


    talkModal.classList.remove(
      "hidden"
    );

  }


  function answerTalk(
    index,
    button
  ) {

    if (
      index ===
      currentTalk.answer
    ) {

      button.classList.add(
        "correct"
      );


      talkChoices
        .querySelectorAll(
          ".talk-choice"
        )
        .forEach(
          btn => {

            btn.disabled =
              true;

          }
        );


      talkFeedback.textContent =
        currentTalk.feedback;


      talkFeedback.classList.remove(
        "hidden"
      );


      speakText.textContent =
        "“" +
        currentTalk.speech +
        "”";


      speakArea.classList.remove(
        "hidden"
      );


      score +=
        20;


      updateScore();

    }


    else {

      button.classList.add(
        "wrong"
      );


      button.disabled =
        true;

    }

  }


  /* ===================================================== */
  /* 말하기 완료 */
  /* ===================================================== */

  function finishSpeaking() {

    talkModal.classList.add(
      "hidden"
    );


    showMissionSuccess();

  }


  /* ===================================================== */
  /* 성공 */
  /* ===================================================== */

  function showMissionSuccess() {

    const target =
      document.querySelector(
        '[data-car="' +
        currentMission.car +
        '"]'
      );


    target.classList.remove(
      "target-car"
    );


    /*
      객차가 위쪽으로 빠져나가는 효과
    */

    target.classList.add(
      "removed"
    );


    successCarText.textContent =
      carNames[
        currentMission.car
      ];


    setTimeout(
      function () {

        successModal.classList.remove(
          "hidden"
        );

      },
      600
    );

  }


  /* ===================================================== */
  /* 정비고 보내기 */
  /* ===================================================== */

  function finishMission() {

    successModal.classList.add(
      "hidden"
    );


    repairs++;


    repairText.textContent =
      repairs;


    score +=
      50;


    updateScore();


    depotMessage.textContent =
      "🏭 " +
      carNames[currentMission.car] +
      " 정비고 입고 완료! 새 임무를 받아보세요.";


    missionText.textContent =
      "✨ 정비 완료! 다음 임무를 기다리는 중...";


    currentMission =
      null;


    /*
      잠시 후 열차 복구
    */

    setTimeout(
      function () {

        resetTrain();

      },
      700
    );

  }


  /* ===================================================== */
  /* 점수 */
  /* ===================================================== */

  function updateScore() {

    scoreText.textContent =
      score;

  }


  /* ===================================================== */
  /* 이벤트 */
  /* ===================================================== */

  newMissionBtn.addEventListener(
    "click",
    startNewMission
  );


  couplers.forEach(
    coupler => {

      coupler.addEventListener(
        "click",
        function () {

          selectCoupler(
            Number(
              coupler.dataset.coupler
            )
          );

        }
      );

    }
  );


  closeCouplerBtn.addEventListener(
    "click",
    function () {

      couplerModal.classList.add(
        "hidden"
      );

    }
  );


  speakDoneBtn.addEventListener(
    "click",
    finishSpeaking
  );


  finishMissionBtn.addEventListener(
    "click",
    finishMission
  );


  /* ===================================================== */
  /* 시작 시 첫 미션 자동 생성 */
  /* ===================================================== */

  setTimeout(
    startNewMission,
    500
  );

});
