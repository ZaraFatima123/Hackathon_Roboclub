// Javascript_file for SpaceX Quiz Game:
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
        answer: "Venus",
        info: "Despite being further from the Sun, Venus is the hottest planet in the solar system."
    }
];

const shuffleQuestions = () => {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
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
    console.log("Displaying question", currentQuestion); // Debugging line
    const questionObj = questions[currentQuestion];
    if (questionObj) {
        document.querySelector("#question").textContent = questionObj.question;
        const choicesContainer = document.querySelector("#choices");
        choicesContainer.innerHTML = '';
    
        questionObj.choices.forEach(choice => {
            const button = document.createElement("button");
            button.textContent = choice;
            button.onclick = () => checkAnswer(choice);
            choicesContainer.appendChild(button);
        });
    } else {
        console.error("No question found for index", currentQuestion); // Debugging line
    }
};

const checkAnswer = (selectedAnswer) => {
    const currentQuestionObj = questions[currentQuestion];
    
    if (selectedAnswer === currentQuestionObj.answer) {
        correctAnswers++;
        showFeedback("Correct!", currentQuestionObj.info);
        celebrationImage.src = "https://cdn-icons-png.flaticon.com/256/9301/9301779.png";
        celebrationImage.classList.remove("hide");
        
        if (correctAnswers === 10) {
            showFeedback("You Won!", `You answered all 10 questions correctly!`);
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

const showFeedback = (status, info) => {
    msg.textContent = `${status} ${info}`;
    msgContainer.classList.remove("hide");
    msgContainer.scrollIntoView({ behavior: "smooth" }); // Scrolls the message into view
};

const updateScore = () => {
    scoreElement.textContent = `Score: ${correctAnswers}`;
};

playBtn.addEventListener("click", () => {
    console.log("Play button clicked"); // Debugging line
    startScreen.classList.add("hide");
    quizContainer.classList.remove("hide");
    shuffleQuestions();
    displayQuestion();
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", () => {
    resetGame();
    startScreen.classList.remove("hide");
    quizContainer.classList.add("hide");
});
