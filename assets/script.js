//add variables
var time = document.querySelector("#counter");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var highscores = document.querySelector(".highscores")
var startButton = document.querySelector("#start");

var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timerCount;
var timer;


//start button event

startButton.addEventListener("click", startGame);

function init(){
    getWins();
    getlosses();
}

function startGame (){
    isWin = false ; 
    secondsLeft = 30;
// Prevents start button from being clicked when round is in progress
    startButton.disabled = true;
    countdown()
    showQuiz()
    handleAnswer()
}

function winGame() {
    wordBlank.textContent = "YOU WON!!!🏆 ";
    winCounter++
    startButton.disabled = false;
    setWins()
  }
  
  // The loseGame function is called when timer reaches 0
  function loseGame() {
    wordBlank.textContent = "GAME OVER";
    loseCounter++
    startButton.disabled = false;
    setLosses()
  }

//game function

    // Create a quiz object
    var quiz = {
      questions: [
        {
          question: "Inside which HTML element do we put the JavaScript??",
          answers: ["<sc>", "<javaScript>", "<Script>"],
          correctAnswer: 2
        },
        {
          question: "In JavaScript, what element is used to store and manipulate text usually in multiples?",
          answers: ["function", "arrays", "variables","strings"],
          correctAnswer: 3
        },
        {
            question: "What tag is used to define an image – or add an image – to an HTML page?",
            answers: ["<div>", "<meta>", "<img>","table"],
            correctAnswer: 2
          },
          {
            question: "What tag is used to define an unordered list that is bulleted?",
            answers: ["ul", "u", "<il>","<ol>"],
            correctAnswer: 0
          }
      ]
    };

  
    
    // Display the quiz
    function showQuiz() {

      for (var i = 0; i < quiz.questions.length; i++) {
         var question = quiz.questions[i];
         document.getElementById("answer1").textContent = question.answers[0];
         document.getElementById("answer2").textContent = question.answers[1];
         document.getElementById("answer3").textContent = question.answers[2];
         document.getElementById("answer4").textContent = question.answers[3];
        //  document.getElementById("correctAnswer").textContent = question.correctAnswer
        //  document.getElementById("question").textContent = question.question;
        //  document.getElementById("answers").textContent = question.answers;
         document.getElementById("correctAnswer").textContent = question.correctAnswer;
      }
      }

     //check answer
function handleAnswer (event) {
    var answer = event.target.value;
    var correctAnswer = quiz.questions[event.target.id].correctAnswer;
    if (answer === correctAnswer) {
        isWin = true;
      alert("Correct!");
    } else {
      alert("Incorrect!");
    }
  }
   
//get score 
// Updates win count on screen and sets win count to client storage
function setWins() {
  win.textContent = winCounter;
  localStorage.setItem("winCount", winCounter);
}

// Updates lose count on screen and sets lose count to client storage
function setLosses() {
  lose.textContent = loseCounter;
  localStorage.setItem("loseCount", loseCounter);
}

//These functions are used by init
function getWins() {
  // Get stored value from client storage, if it exists
  var storedWins = localStorage.getItem("winCount");
  // If stored value doesn't exist, set counter to 0
  if (storedWins === null) {
    winCounter = 0;
  } else {
    // If a value is retrieved from client storage set the winCounter to that value
    winCounter = storedWins;
  }
  //Render win count to page
  win.textContent = winCounter;
}

function getlosses() {
  var storedLosses = localStorage.getItem("loseCount");
  if (storedLosses === null) {
    loseCounter = 0;
  } else {
    loseCounter = storedLosses;
  }
  lose.textContent = loseCounter;
}

function checkWin() {
  // If the word equals the blankLetters array when converted to string, set isWin to true
  if (chosenWord === blanksLetters.join("")) {
    // This value is used in the timer function to test if win condition is met
    isWin = true;
  }
}

//score add

//score post

//timer
//The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function countdown() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    time.textContent = timerCount;
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
    //   loseGame();
    }
  }, 1000);
}

// Add reset button
var resetButton = document.querySelector("#reset");
// Attaches event listener to button
resetButton.addEventListener("click", resetGame);

//reset game
function resetGame() {
    // Reset win and loss score
    winCounter = 0;
    loseCounter = 0;
    // posts win and loss counts 
    setWins()
    setLosses()
  }