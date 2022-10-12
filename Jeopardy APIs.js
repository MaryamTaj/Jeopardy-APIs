// Helper function - gets a random integer up to (but not including) the maximum
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

// Select the spans & divs where we'll display outputs.
const pointsSpan = document.querySelector("#points");
const scoreSpan = document.querySelector("#score");
const questionDiv = document.querySelector("#question");

// Select the buttons and input fields where users can provide inputs.
const randomButton = document.querySelector("#random");
const hardButton = document.querySelector("#hard");
const catButton = document.querySelector("#catPuns");
const submitButton = document.querySelector("#submit");
const answerInputBox = document.querySelector("#userAnswer");

// Starting variables - we'll fill replace these with the API
let currentQuestion =
  "The Japanese name for this grass-type pokemon, Fushigidane, is a pun on the phrase 'strange seed.'";
let currentAnswer = "bulbasaur";
let currentPoints = 300;
let currentScore = 0;
let currentQuestionLive = true;

// Function to update the text on the board to match our variables.
const updateBoard = () => {
  pointsSpan.innerHTML = currentPoints;
  scoreSpan.innerHTML = currentScore;
  // Update the question too.
  questionDiv.innerHTML = currentQuestion;
};

// Call the function!
updateBoard();


// Right now the user can answer the question as many times as they want, scoring theoretically infinite points as long as they know the answer to the current question. This function prevents them from providing the correct answer multiple times.
const correctAnswer = () => {
  if (currentQuestionLive === false){
    currentPoints = 0;
    if (currentAnswer === "bulbasaur"){
      pointsSpan.innerHTML = 300;
    } else {
      pointsSpan.innerHTML = json[index].value;
    }
  } 
};

// Checks user's answer
const submitAnswer = () => {
  //correctAnswer();
  let inputAnswer = answerInputBox.value;
  let spaceIndex = inputAnswer.indexOf(" ");
  let finalAnswer = inputAnswer.substr(spaceIndex + 1)
  if (finalAnswer.toLowerCase() === currentAnswer){
    currentScore += currentPoints;
    currentQuestionLive = false;
  } else {
      currentScore -= currentPoints;
  };
  updateBoard();
  correctAnswer();
};


// Attach that function to the submit button via an event listener.
submitButton.addEventListener("click", submitAnswer);

// Write out an API call for each of the three question buttons on screen.

randomButton.addEventListener("click", fetchRandom);
async function fetchRandom() {
  let response = await fetch("https://jeopardy.wang-lu.com/api/random");
  let json = await response.json();
  currentQuestion = json[0].question;
  currentAnswer = json[0].answer;
  currentPoints = json[0].value;
  currentQuestionLive = true;
  updateBoard();
}

hardButton.addEventListener("click", fetchHard);
async function fetchHard() {
  let response = await fetch("https://jeopardy.wang-lu.com/api/clues?value=1000");
  let json = await response.json();
  let index = getRandomInt(json.length - 1);
  currentQuestion = json[index].question;
  currentAnswer = json[index].answer;
  currentPoints = json[index].value;
  currentQuestionLive = true;
  updateBoard();
}

catButton.addEventListener("click", fetchCat);
async function fetchCat() {
  let response = await fetch("https://jeopardy.wang-lu.com/api/clues?category=101");
  let json = await response.json();
  let index = getRandomInt(json.length - 1);
  currentQuestion = json[index].question;
  currentAnswer = json[index].answer;
  currentPoints = json[index].value;
  currentQuestionLive = true;
  updateBoard();
}
