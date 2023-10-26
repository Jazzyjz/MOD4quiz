// variables
var startButton = document.querySelector("#start");
var resetButton = document.querySelector('#reset');
var time = document.querySelector("#counter");
var wordBlank = document.querySelector("#wb");
var choicea = document.querySelector("#ca");
var choiceb = document.querySelector("#cb");
var choicec = document.querySelector("#cc");
var choiced = document.querySelector("#cd");
var win = document.querySelector('.win');
var lose = document.querySelector('.lose');
var highscores = document.createElement('p');
var scores = document.querySelector('.highscores');

//buttons, event listener
scores.addEventListener('click', viewScores);
resetButton.addEventListener('click', resetGame);
startButton.addEventListener("click", startGame);
choicea.addEventListener("click", checkAnswer);
choiceb.addEventListener("click", checkAnswer);
choicec.addEventListener("click", checkAnswer);
choiced.addEventListener("click", checkAnswer);

let winCounter = 0;
let loseCounter = 0;

var wcount = localStorage.getItem('win');
var lcount= localStorage.getItem('lose');

//start game function
function startGame (){
    timerCount=60;
    startButton.disabled =true;
    startTime();
    showQuiz();
    winGame();
};
//timer function

function startTime(){
      // Sets timer
  timer = setInterval(function() {
    timerCount--;
    time.textContent = timerCount;
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
    //   loseGame();
    loseGame();
    }
  }, 1000);
};

  // Create a quiz object
  var quiz = {
    questions: [
      {
        question: "Inside which HTML element do we put the JavaScript??",
        answers: ["<sc>", "<javaScript>", "<script>","<scr>"],
        correctAnswer: "<script>"
      },
      {
        question: "In JavaScript, what element is used to store and manipulate text usually in multiples?",
        answers: ["Function", "Arrays", "Variables","Strings"],
        correctAnswer: "Strings"
      },
      {
          question: "What tag is used to define an image – or add an image – to an HTML page?",
          answers: ["<div>", "<meta>", "<img>","<table>"],
          correctAnswer: "<img>"
        },
        {
          question: "What tag is used to define an unordered list that is bulleted?",
          answers: ["<ul>", "<u>", "<il>","<ol>"],
          correctAnswer: "<ul>"
        },
        {
          question: "Which of the following is NOT a data type?",
          answers: ["<ul>", "<u>", "<il>","<ol>"],
          correctAnswer: "<ul>"
        }
    ]
  };
 let index = 0

// Display quiz function

function showQuiz() {
  // console.log(quiz.questions[index])
        let question = quiz.questions[index];
        // console.log(question);
        document.getElementById("ca").textContent = question.answers[0];
        document.getElementById("cb").textContent = question.answers[1];
        document.getElementById("cc").textContent = question.answers[2];
        document.getElementById("cd").textContent = question.answers[3];
        document.getElementById("question").textContent = question.question;
        
  };

//check answer function
function checkAnswer (event) {
  // when button is clicked, if button answer matches correct answer 
  // then win score goes up
  //else win score down 
  var rightChoice = quiz.questions[index].correctAnswer
  //event.target - gives location of element
  if(event.target.textContent == rightChoice){
    winCounter++;
     console.log(winCounter);
     win.textContent = 'wins : ' + winCounter;
     localStorage.setItem("win", winCounter);
  }
  else {
    timerCount--;
    loseCounter++;
    console.log(loseCounter);
    lose.textContent = 'losses : ' + loseCounter;
    localStorage.setItem("lose", loseCounter);
  }
  index++
  showQuiz()
  // if (index = 4){
  //   console.log('game done');
  // };
  console.log(index);
};

// add function that will decrement time when losecounter increases 

function lessTime(){
  if (losecounter++){
    timerCount--;
  }
}

//function to view highscores

function viewScores (){
highscores.textContent = wcount;

}

// reset score function

function resetGame(){
  wordBlank.textContent='';
index = 0;
  startGame()
}


//win function
function winGame() {
  if(winCounter >=3){
  wordBlank.textContent = "YOU WON!!!🏆 ";
  startButton.disabled = false;}
}

//lose function

function loseGame(){

    wordBlank.textContent = "GAME OVER";
    startButton.disabled = false;
    loseCounter++
}