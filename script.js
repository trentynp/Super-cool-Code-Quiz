
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
var timeEl = document.querySelector("#time");
var startBtn = document.querySelector("#startButton");
var submitBtn = document.querySelector("#submit-button");
var titleScreen = document.querySelector("#title-section");
var quizScreen = document.querySelector("#quiz-section");
var highScoreScreen = document.querySelector("#highscore-section");
var highScoreDisplay = document.querySelector("#highscore-display-section");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

var questionsEl = document.querySelector("#question");
var choicesEl = document.querySelector("#choices");

function startQuiz() {
    titleScreen.setAttribute("class", "hide");
    quizScreen.setAttribute("class", "show");
    timerId = setInterval(tick, 1000);
    timeEl.textContent = time;
  
    getQuestion();
  }

  function tick() {
    time--;
    timeEl.textContent = time;
    if (time <= 0) {
      quizEnd();
    }
  }

  function getQuestion() {
    
    var currentQuestion = questions[currentQuestionIndex];
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;
  
    choicesEl.innerHTML = "";
  
   
    currentQuestion.choices.forEach(function(choice, i) {
      
      var choiceNode = document.createElement("button");
      choiceNode.setAttribute("class", "choice");
      choiceNode.setAttribute("value", choice);
      choiceNode.textContent = i + 1 + ". " + choice;
      choiceNode.onclick = questionClick;
      choicesEl.appendChild(choiceNode);
    });
  }

  function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
      time -= 15;
  
      if (time < 0) {
        time = 0;
      }
      timeEl.textContent = time;
      feedbackEl.textContent = "Wrong!";
    } else {

      feedbackEl.textContent = "Correct!";
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);
    
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
  }

  function quizEnd() {
    clearInterval(timerId);

    var highscoreSectionEl = document.querySelector("#highscore-section");
    highscoreSectionEl.setAttribute("class", "show");
  
    var finalScoreEl = document.querySelector("#final-score");
    finalScoreEl.textContent = time;
  
    quizScreen.setAttribute("class", "hide");
  }

function saveHighscore() {
    var initials = initialsEl.value.trim();
  
    if (initials !== "") {
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];

      var newScore = {
        score: time,
        initials: initials
      };

      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
      window.location.href = "highScore.html";
    }
  }

  function checkForEnter(event) {

    if (event.key === "Enter") {
      saveHighscore();
    }
  }
  
  submitBtn.onclick = saveHighscore;
  
  startBtn.onclick = startQuiz;
  
  initialsEl.onkeyup = checkForEnter;

  var questions = [
    {
        title: "What three types of code have we learned so far?:",
        choices: ["HTML", "CSS", "JavaScript", "All Of The Above"],
        answer: "All Of The Above"
    },
    {
        title: "What form of code is used to style HTML?",
        choices: ["CSS", "JavaScript", "JQuery", "Python"],
        answer: "CSS"
    },
    {
        title: "What javascipt method can we use to select an html element?",
        choices: ["document.queryselector()", "document.getElementChild", "document.getElementById", "Both 1 and 3"],
        answer: "Both 1 and 3"
    },
    {
        title: "What html tag is NOT included in the HEAD tag?",
        choices: ["link", "meta", "title", "header"],
        answer: "header"
    },
    {
        title: "What attribute is used in html to decorate content?",
        choices: ["css", "class", "src", "style"],
        answer: "style"
    }
]