// Select DOM elements
const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const exitBtn = infoBox.querySelector(".buttons .quit-btn");
const continueBtn = infoBox.querySelector(".buttons .restart-btn");
const quizBox = document.querySelector(".quiz-box");
const timeCount = document.querySelector(".timer .timer-sec");
const timeLineElement = document.querySelector("header .time-line");
const questionElement = document.getElementById("question");
const question = document.getElementById("question");
const answerOptions = document.querySelector(".answer-options");
const resultBox = document.querySelector(".result-box");
const restartBtn = resultBox.querySelector(".buttons .restart-btn");
const quitBtn = resultBox.querySelector(".buttons .quit-btn");

// Variables for quiz state
let time = 10; // Initial time for each question
let timerInterval; // Interval for the timer countdown
let timerLine; // Interval for the timer line animation
let currentQuestionIndex = 0; // Index of the current question
let correctScore = 0; // Number of correctly answered questions
let incorrectScore = 0; // Number of incorrectly answered questions

// START BUTTON

// Event handler for the start button click
startBtn.onclick = () => {
  try {
    questions = shuffle(questions); // Shuffle the questions
    infoBox.classList.add("activeInfo"); // Show the information box
  } catch (error) {
    alert("Oops! Gremlins invaded the Mushroom Quiz machinery. Try again later!");
  }
};

//INFO BOX

// Event handler for the exit button click
exitBtn.onclick = () => {
  infoBox.classList.remove("activeInfo");
};

// Event handler for the continue button click
continueBtn.onclick = () => {
  infoBox.classList.remove("activeInfo"); // Hide Info box
  quizBox.classList.add("activeQuiz"); // Show Quiz box
  showQuestions(); //Dislpay Questions
  startTimer(); // Start Timer countdown
  startTimerLine(); // Start Timer Line
};

//QUIZ BOX

/**
 * Shuffles the order of elements in an array
 * Using the Fisher-Yates shuffle algorithm. See the README.md for acknowledgement.
 */
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// Create an array passing the questions, answer options and set the correct answer
let questions = [
  {
    question: "What is the main purpose of a mushroom cap?",
    answers: [
      { text: "Reproduction", correct: false },
      { text: "Protection", correct: true },
      { text: "Collecting sunlight", correct: false },
      { text: "Attracting insects", correct: false },
    ],
  },
  {
    question: "Which mushroom is commonly used in cooking?",
    answers: [
      { text: "Fly Agaric", correct: false },
      { text: "Autumn Skullcap", correct: false },
      { text: "Button Mushroom", correct: true },
      { text: "Inky Cap", correct: false },
    ],
  },
  {
    question: "Where are spores produced in a mushroom?",
    answers: [
      { text: "Stipe", correct: false },
      { text: "Gills", correct: true },
      { text: "Cap", correct: false },
      { text: "Annulus", correct: false },
    ],
  },
  {
    question:
      "Which mushroom is known for it's glowing in the dark properties?",
    answers: [
      { text: "Morel", correct: false },
      { text: "Chanterelle", correct: false },
      { text: "Shiitake", correct: false },
      { text: "Jack O'Lantern", correct: true },
    ],
  },
  {
    question: "Which toxic mushroom has a bright red cap with white dots?",
    answers: [
      { text: "Fly Agaric", correct: true },
      { text: "Death Cap", correct: false },
      { text: "Sickener", correct: false },
      { text: "False Morel", correct: false },
    ],
  },
  {
    question: "What is the common name for Pleurotus ostreatus?",
    answers: [
      { text: "Shiitake", correct: false },
      { text: "Oyster Mushroom", correct: true },
      { text: "Enoki", correct: false },
      { text: "Morel", correct: false },
    ],
  },
  {
    question: "What is the primary role of the mycelium in mushrooms?",
    answers: [
      { text: "Producing spores", correct: false },
      { text: "Conducting photosynthesis", correct: false },
      { text: "Exchanging gases", correct: false },
      { text: "Absorbing nutrients", correct: true },
    ],
  },
  {
    question:
      "Which mushroom is often used as a meat substitute in vegetarian dishes?",
    answers: [
      { text: "Portabello", correct: true },
      { text: "Enoki", correct: false },
      { text: "Oyster", correct: false },
      { text: "Maitake", correct: false },
    ],
  },
  {
    question: "Which mushroom is known for its medicinal benefits?",
    answers: [
      { text: "Morel", correct: false },
      { text: "Chanterelle", correct: false },
      { text: "Cremin", correct: false },
      { text: "Maitake", correct: true },
    ],
  },
  {
    question: "What is the most commonly cultivated mushroom worldwide?",
    answers: [
      { text: "Lions Mane", correct: false },
      { text: "Chanterelle", correct: false },
      { text: "White button", correct: true },
      { text: "Oyster", correct: false },
    ],
  },
];

/**
 * Function to display the current question and its answer options to the user.
 * It clears the previous answer options, then retrieves the current question from the 'questions' array.
 * The question number is updated and displayed along with the question text.
 * Answer options are shuffled for each question and displayed as buttons.
 * Event listeners are set for each answer button to handle user selection.
 */
function showQuestions() {
  resetState(); // Remove the previous answer options

  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;

  question.innerHTML = questionNumber + ". " + currentQuestion.question;
  document.getElementById("current-question").textContent = questionNumber; // Update the current question number in the span
  currentQuestion.answers = shuffle(currentQuestion.answers);// Shuffle the answer options to randomize their order
  // Iterate through each answer option and create a button for it
  currentQuestion.answers.forEach((answer) => {
    let button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-btn");
    answerOptions.appendChild(button);
    // Set a data attribute for the correct answer
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

/**
 * Function to remove the previously displayed answer options from the DOM.
 * It removes all child elements of the 'answerOptions' element until none remain.
 */
function resetState() {
  while (answerOptions.firstChild) {
    answerOptions.removeChild(answerOptions.firstChild);
  }
}

/**
 * Handles the user's selection of an answer.
 * @param {Event} e - The event object triggered by the button click.
 */
function selectAnswer(e) {
  let selectedBtn = e.target;
  let isCorrect = selectedBtn.dataset.correct === "true";

  clearInterval(timerInterval); //Stop the timer when any answer buttons are clicked
  clearInterval(timerLine); //Stop the timer line when any answer buttons are clicked

  // Add appropriate classes and update scores based on correctness of the selected answer
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    correctScore++;
    document.getElementById("correct-score").textContent = correctScore;
  } else {
    selectedBtn.classList.add("incorrect");
    selectedBtn.classList.add("apply-shake"); // Add shake animation class to incorrect answer button
    incorrectScore++;
    document.getElementById("incorrect-score").textContent = incorrectScore;
  }
  // Disable all answer buttons and highlight the correct one
  Array.from(answerOptions.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  setTimeout(showNextQuestion, 1500); //Show next question after 1,5sec
}

/**
 * Display the next question or show the result if all questions have been answered.
 */
function showNextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++; //increment the current question number
    showQuestions();
    startTimer();
    startTimerLine();
  } else {
    // If there are no more questions remaining, show the Result box
    showResult();
  }
}

// RESULT BOX

/**
 * showResult function:
 * Removes the activeInfo class from infoBox, removes the activeQuiz class from quizBox,
 * and adds the activeResult class to resultBox to display the result. Determines the score message
 * based on the number of correct answers and updates the final score element accordingly.
 */
function showResult() {
  infoBox.classList.remove("activeInfo");
  quizBox.classList.remove("activeQuiz");
  resultBox.classList.add("activeResult");

  let finalScoreElement = resultBox.querySelector(".final-score");
  let scoreMessage;
  // Determine the score message based on the number of correct answers
  if (correctScore <= 4) {
    scoreMessage = '<span><div>' + correctScore + ' out of ' + questions.length + '</div><div>Ohh! You need a little bit more practice!</div></span>';
  } else if (correctScore >= 5 && correctScore <= 7) {
    scoreMessage = '<span>You got <div>' + correctScore + ' out of ' + questions.length + '</div><div>Good job! Just a bit more now!</div></span>';
  } else if (correctScore >= 8 && correctScore <= 10) {
    scoreMessage = '<span>You got <div>' + correctScore + ' out of ' + questions.length + '</div><div>AWESOME! You know your mushrooms!</div></span>';
  }
  finalScoreElement.innerHTML = scoreMessage;
}

// Event listener for the quit button, reloads the window to restart the quiz upon click
quitBtn.onclick = () => {
  window.location.reload();
};

// Event listener for the restart button
restartBtn.onclick = () => {
  // Remove the result box and show the quiz box
  resultBox.classList.remove("activeResult");
  quizBox.classList.add("activeQuiz");
  // Reset question index and scores
  currentQuestionIndex = 0;
  correctScore = 0;
  incorrectScore = 0;
  // Display the first question and start the timer and timer line
  showQuestions();
  startTimer();
  startTimerLine();
};

/**
 *Start timer function:
 * Resets the timer to 15 seconds, updates the timer display, clears any existing interval to prevent overlapping timers,
 * and starts a new interval that decrements the timer every second. If the time reaches 0, increments the incorrect score
 * if no answer is selected, updates the display, and either moves to the next question or shows the result if no more questions remain.
 */
function startTimer() {
  time = 10;
  timeCount.textContent = time; // Update the timer display initially
  clearInterval(timerInterval); // Clear any existing interval, prevent overlapping timers
  timerInterval = setInterval(() => {
    if (time <= 0) {
      clearInterval(timerInterval); // Stop the timer if time reaches 0
      incorrectScore = incorrectScore + 1; // Incrementing incorrect score if no answer selected
      document.getElementById("incorrect-score").textContent = incorrectScore;

      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestions();
        startTimer();
      } else {
        showResult();
      }
    } else {
      time--; // Decrement the time if it's greater than 0
      timeCount.textContent = time; // Update the timer display
    }
  }, 1000); // Repeat every 1 second (1000 milliseconds)
}

/**
 * Start timer line function:
 * Initializes the time for the timer line, clears any existing timer line interval, and sets a new interval
 * for updating the width of the timer line element. The interval adjusts the time and updates the width
 * until the time reaches 100%, at which point the timer is stopped.
 */
function startTimerLine() {
  let time = 0;
  clearInterval(timerLine);
  timerLine = setInterval(timer, 100);
  //Increments the time by 1 on each interval, updates the width of the time line element,
  function timer() {
    time += 1;
    timeLineElement.style.width = time + "%";

    if (time >= 100) {
      clearInterval(timerLine);
    }
  }
}
