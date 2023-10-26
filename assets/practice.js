//add variables
var time = document.querySelector("#counter");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var highscores = document.querySelector(".highscores")
var wordBlank = document.querySelector("#wb")

var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timerCount;
var timer;

// Add multiple choice buttons
var mc1 = document.querySelector("#answer1");
var mc2 = document.querySelector("#answer2");
var mc3 = document.querySelector("#answer3");
var mc4 = document.querySelector("#answer4");
//attach event listener to button
mc1.addEventListener("click",handleAnswer);
mc2.addEventListener("click",handleAnswer);
mc3.addEventListener("click",handleAnswer);
mc4.addEventListener("click",handleAnswer);

// Add reset button
var resetButton = document.querySelector("#reset");
// Attaches event listener to button
resetButton.addEventListener("click", resetGame);
//add start button
var startButton = document.querySelector("#start");
//start button event
startButton.addEventListener("click", startGame);

function init(){
    getWins();
    getlosses();
}

function startGame (){
    isWin = false ; 
    timerCount = 10;
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
    var quiz = [{ 
          question:  "Inside which HTML element do we put the JavaScript??",
          answers: {
            a:"<sc>", 
            b: "<javaScript>",
            c: "<Script>",
            d: "<jsc>",
          correctAnswer: "c"
        },
      },
        {
          question: "In JavaScript, what element is used to store and manipulate text usually in multiples?",
          answers: {
            a: "function",
            b: "arrays", 
            c: "variables",
            d: "strings",
          correctAnswer: "d",
        },
      },
        {
            question: "What tag is used to define an image – or add an image – to an HTML page?",
            answers: {
            a: "<div>", 
            b :"<meta>",
            c: "<img>",
            d: "table",
            correctAnswer: "c",
          },
        },
          {
            question: "What tag is used to define an unordered list that is bulleted?",
            answers: {
              a: "ul", 
              b: "u",
              c: "<il>",
              d: "<ol>",
            correctAnswer: "a",
          },
        }
      ];

      let quizIndex = 0;
  
    
    // Display the quiz
    function showQuiz() {
      //for every question less than the totak questions length, display another one 
        if(quizIndex >= quiz.length)
        return;
        let show = document.getElementById('question');
        let q = quiz[quizIndex];
        show.innerHTML = q.question;
        Object.entries

      // for (var i = 0; i < quiz.questions.length; i++) {
      //    var question = quiz.questions[i];
      //    document.getElementById("answer1").textContent = question.answers[0];
      //    document.getElementById("answer2").textContent = question.answers[1];
      //    document.getElementById("answer3").textContent = question.answers[2];
      //    document.getElementById("answer4").textContent = question.answers[3];
      // }
      };
      
     //check answer
function handleAnswer (event) {
    var answer = event.value;
    var correctAnswer = quiz.questions[i].correctAnswer;
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
    winCounter = "Wins : " +0;
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
    loseCounter = "Losses : "+ 0;
  } else {
    loseCounter = "Losses : " + storedLosses;
  }
  lose.textContent = loseCounter;
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
      loseGame();
      clearInterval(timer);
    //   loseGame();
    }
  }, 1000);
}

//reset game
function resetGame() {
    // Reset win and loss score
    winCounter = "Wins : " + 0;
    loseCounter = "Losses : " + 0;
    // posts win and loss counts 
    setWins()
    setLosses()
  }