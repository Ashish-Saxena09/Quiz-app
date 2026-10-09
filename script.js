const questions = [
  {
    question: "Which is largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      { text: "Vatican City", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "Sri Lanka", correct: false },
    ],
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antartica", correct: true },
    ],
  },
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false },
    ],
  },
  {
    question: "Which is the most populated country in the world?",
    answers: [
      { text: "Russia", correct: false },
      { text: "India", correct: true },
      { text: "America", correct: false },
      { text: "China", correct: false },
    ],
  },
];

const questionElement = document.querySelector("#question");
const answerbtn = document.querySelector("#answer-buttons");
const nextbtn = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextbtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;

  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerbtn.appendChild(button);

    button.addEventListener("click", () => {
      const buttons = answerbtn.querySelectorAll(".btn");

      buttons.forEach((btn) => {
        btn.classList.remove("selected");
      });

      button.classList.add("selected");

      selectAnswer(answer);
    });
  });
}

function resetState() {
  nextbtn.style.display = "none";
  while (answerbtn.firstChild) {
    answerbtn.removeChild(answerbtn.firstChild);
  }
}

function selectAnswer(answer) {
  if (answer.correct) {
    score++;
  }
  Array.from(answerbtn.children).forEach((button) => {
    button.disabled = true;
  });
  nextbtn.style.display = "block";
}

nextbtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else if (nextbtn.innerHTML === "Play Again") {
    startQuiz();
  } else {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextbtn.innerHTML = "Play Again";
    nextbtn.style.display = "block";
  }
});

startQuiz();
