const questions = [
    {
        question: "Inside which HTML element do we put the JavaScript??",
        choices: ["<sc>", "<javaScript>", "<script>","<scr>"],
        correctAnswer: "<script>"
    },
    {
        question: "In JavaScript, what element is used to store and manipulate text usually in multiples?",
        choices: ["Function", "Arrays", "Variables","Strings"],
        correctAnswer: "Strings"
    },
    {
        question: "When an operator's value is NULL, the typeof returned by the unary operator is:",
        choices: ["Boolean", "Undefined", "Object","Integer"],
        correctAnswer: "Object"
    },
    {
        question: "How can a data type be declared to be a constant type?",
        choices: ["const", "constant", "let","var"],
        correctAnswer: "const"
    },
    {
        question: "Javascript is an ______ language?",
        choices: ["Object-Oriented", "Object-Based", "Procedural","None of the Above"],
        correctAnswer: "Object-Oriented"
    },
    {
        question: "Which of the following methods can be used to display data in some form using javascript?",
        choices: ["document.write()", "console.log()", "window.alert()","All of the Above"],
        correctAnswer: "All of the Above"
    },
    {
        question: "What keyword is used to declare an asynchronous function in Javascript?",
        choices: ["async", "await", "setTimeout","None of the Above"],
        correctAnswer: "async"
    },
    {
        question: "How do you stop an interval timer in Javascript?",
        choices: ["clearInterval", "clearTimer", "intervalOver","none of the above"],
        correctAnswer: "clearInterval"
    },
    {
        question: "How can we write a comment in Javascript?",
        choices: ["()", "//", "#","$"],
        correctAnswer: "//"
    },
    {
        question: "Arrays in JavaScript are defined by which of the following statements?",
        choices: ["list of values", "list of objects", "list of string","list of functions"],
        correctAnswer: "list of values"
    }
];




let highScores = [];

function startQuiz() {
    
    currentQuestion = 0;
    score = 0;
    timeRemaining = 60;
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('inputSection').style.display = 'none';
    document.querySelector('button[onclick="startQuiz()"]').style.display = 'none';
    document.querySelector('button[onclick="restartQuiz()"]').style.display = 'none';
    document.getElementById('scoreDisplay').textContent = score;
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');
    const currentQ = questions[currentQuestion];
    questionElement.textContent = currentQ.question;
    choicesElement.innerHTML = "";
    currentQ.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.onclick = () => checkAnswer(choice);
        choicesElement.appendChild(button);
    });
}

function startTimer() {
    timerInterval = setInterval(() => {
        var time = document.getElementById('time')
        timeRemaining--;
        time.textContent = timeRemaining;
        if (timeRemaining <= 0 || currentQuestion >= questions.length) {
            clearInterval(timerInterval);
            document.getElementById('question').textContent = "Quiz completed!";
            document.getElementById('inputSection').style.display = 'block';
            document.getElementById('choices').style.display = 'none';
            document.getElementById('result').style.display = 'none';
            document.querySelector('button[onclick="restartQuiz()"]').style.display = 'block';
        }
    }, 1000);
}

function checkAnswer(choice) {
    const currentQ = questions[currentQuestion];
    if (choice === currentQ.correctAnswer) {
        score++;
         document.getElementById('result').textContent = "Correct!";
    } else {
         document.getElementById('result').textContent = "Incorrect!";
        timeRemaining--;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        document.getElementById('question').textContent = "Quiz completed!";
        document.getElementById('choices').style.display = 'none';
        document.getElementById('result').style.display = 'none';
        document.querySelector('button[onclick="restartQuiz()"]').style.display = 'block';
    }
    document.getElementById('scoreDisplay').textContent = score;
}

function restartQuiz() {
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('choices').style.display = 'block';
    document.getElementById('result').style.display = 'block';
    document.getElementById('result').textContent = '';
    document.querySelector('button[onclick="startQuiz()"]').style.display = 'block';
    document.querySelector('button[onclick="restartQuiz()"]').style.display = 'none';
    document.getElementById('inputSection').style.display = 'none';
    currentQuestion = 0;
    score = 0;
    timeRemaining = 60;
    displayQuestion();
    startTimer();

   
}

function saveHighScore() {
    const initials = document.getElementById('initials').value.trim();
    if (initials !== '') {
        const userScore = { initials, score };
        highScores.push(userScore);
        localStorage.setItem('highScores', JSON.stringify(highScores));
        alert('Highscore saved!');
        document.getElementById('initials').value = '';
    } else {
        alert('Please enter your initials.');
    }
}

function viewHighScores() {
    const savedHighScores = JSON.parse(localStorage.getItem('highScores'));
    if (savedHighScores) {
        let highscoreText = "Highscores:\n";
        savedHighScores.forEach((entry, index) => {
            highscoreText += `${index + 1}. ${entry.initials} - ${entry.score}\n`;
            // highscoreText += index+1 +'.'+ entry.initials + ' - ' + entry.score ; 
        });
        document.getElementById('quiz').style.display = 'none';
        document.getElementById('inputSection').style.display = 'none';
        document.getElementById('choices').style.display = 'none';
        document.getElementById('choices').style.display = 'block';
        document.getElementById('result').style.display = 'block';
        document.getElementById('result').textContent= highscoreText;
        document.querySelector('button[onclick="startQuiz()"]').style.display = 'none';
        document.querySelector('button[onclick="restartQuiz()"]').style.display = 'block';
       

    } else {
        alert('No highscores found.');
    }
}


