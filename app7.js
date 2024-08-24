const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const celebrationImage = document.querySelector("#celebration-image");
const scoreElement = document.querySelector("#score");
const playBtn = document.querySelector("#play-btn");
const quizContainer = document.querySelector("#quiz-container");
const startScreen = document.querySelector("#start-screen");

let currentQuestion = 0;
let correctAnswers = 0;

const questions = [
    {
        question: "What is the largest planet in our solar system?",
        choices: ["Earth", "Jupiter", "Saturn"],
        answer: "Jupiter",
        info: "Jupiter is the largest planet in our solar system."
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Mars", "Venus", "Mercury"],
        answer: "Mars",
        info: "Mars is known as the Red Planet due to its reddish appearance."
    },
    {
        question: "What is the closest star to Earth?",
        choices: ["Proxima Centauri", "Sirius", "Sun"],
        answer: "Sun",
        info: "The Sun is the closest star to Earth."
    },
    {
        question: "How many planets are in the solar system?",
        choices: ["7", "8", "9"],
        answer: "8",
        info: "There are 8 planets in our solar system."
    },
    {
        question: "What galaxy do we live in?",
        choices: ["Andromeda", "Milky Way", "Whirlpool"],
        answer: "Milky Way",
        info: "We live in the Milky Way galaxy."
    },
    // Additional questions
    {
        question: "Which planet has the most moons?",
        choices: ["Earth", "Saturn", "Neptune"],
        answer: "Saturn",
        info: "Saturn has the most moons of any planet in our solar system."
    },
    {
        question: "What is the name of the first artificial satellite launched into space?",
        choices: ["Hubble", "Sputnik", "Voyager"],
        answer: "Sputnik",
        info: "Sputnik was the first artificial satellite, launched by the Soviet Union."
    },
    {
        question: "Which planet is known for its rings?",
        choices: ["Uranus", "Saturn", "Jupiter"],
        answer: "Saturn",
        info: "Saturn is famous for its prominent ring system."
    },
    {
        question: "What is the name of the rover that landed on Mars in 2021?",
        choices: ["Opportunity", "Curiosity", "Perseverance"],
        answer: "Perseverance",
        info: "The Perseverance rover landed on Mars in February 2021."
    },
    {
        question: "Which celestial body is the hottest in the solar system?",
        choices: ["Mercury", "Venus", "Sun"],
        answer: "Sun",
        info: "Despite being further from the Sun, Venus is the hottest planet in the solar system."
    }
];

// Include the confetti library in your HTML file
// <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>

const shuffleQuestions = () => {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
};

const showConfetti = () => {
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
    });
};

const resetGame = () => {
    currentQuestion = 0;
    correctAnswers = 0;
    updateScore();
    shuffleQuestions();
    displayQuestion();
    msgContainer.classList.add("hide");
    celebrationImage.classList.add("hide");
    quizContainer.classList.add("hide");
    startScreen.classList.remove("hide");
};

const displayQuestion = () => {
    const currentQuestionObj = questions[currentQuestion];
    const questionElement = document.querySelector("#question");
    const choicesElement = document.querySelector("#choices");

    questionElement.textContent = currentQuestionObj.question;
    choicesElement.innerHTML = "";

    currentQuestionObj.choices.forEach(choice => {
        const choiceBtn = document.createElement("button");
        choiceBtn.textContent = choice;
        choiceBtn.onclick = () => checkAnswer(choice);
        choicesElement.appendChild(choiceBtn);
    });
};

const updateScore = () => {
    scoreElement.textContent = `Score: ${correctAnswers}`;
};

const showFeedback = (message, extraInfo) => {
    msg.textContent = `${message} ${extraInfo}`;
    msgContainer.classList.remove("hide");
};

const checkAnswer = (selectedAnswer) => {
    const currentQuestionObj = questions[currentQuestion];

    if (selectedAnswer === currentQuestionObj.answer) {
        correctAnswers++;
        showFeedback("Correct!", currentQuestionObj.info);
        showConfetti();
        // celebrationImage.src = "https://images.emojiterra.com/google/noto-emoji/animated-emoji/1f38a.gif";
        // celebrationImage.classList.remove("hide");

        if (correctAnswers === questions.length) {
            showConfetti();
            alert("You won!  - SpaceX Quiz🎉🎉🎊🎊");
            quizContainer.classList.add("hide");
            msgContainer.classList.remove("hide");
            return;
        }
    } else {
        showFeedback("Incorrect!", "Try again!");
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        showFeedback("Game Over!", `You answered ${correctAnswers} questions correctly.`);
        quizContainer.classList.add("hide");
        msgContainer.classList.remove("hide");
        celebrationImage.classList.add("hide");
    }

    updateScore();
};

playBtn.addEventListener("click", () => {
    shuffleQuestions();
    resetGame();
    displayQuestion();
});

resetBtn.addEventListener("click", resetGame);

newGameBtn.addEventListener("click", () => {
    msgContainer.classList.add("hide");
    resetGame();
    displayQuestion();
});
