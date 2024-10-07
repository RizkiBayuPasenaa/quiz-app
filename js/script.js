import questions from "./dataquestion.js";
const theme = document.getElementById('switch-mode');

theme.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});


let score = 0;
let currentIndex = 0;

const questionNumberElement = document.getElementById('question-number');
const questionElement = document.getElementById('question-text');
const optionsContainer = document.getElementById('quiz-options');
const nextButton = document.getElementById('next-question');
const restartButton = document.getElementById('restart-question');
const resultContainer = document.getElementById('result');
const scorePercentageElement = document.getElementById('score-percentage');


function startQuiz() {
    score = 0;
    currentIndex = 0;
    resultContainer.style.display = 'none';
    nextButton.style.display = 'none';
    restartButton.style.display = 'none';
    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currentIndex];
    questionNumberElement.textContent = `Question ${currentIndex + 1}`;
    questionElement.textContent = currentQuestion.text;
    optionsContainer.innerHTML = '';
    
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option.answer;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectAnswer(option.correct, button));
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(correct, button) {
    if (correct) {
        score += 1;
        button.style.backgroundColor = '#4caf50';
    } else {
        button.style.backgroundColor = '#f44336';
    }

    Array.from(optionsContainer.children).forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === questions[currentIndex].options.find(opt => opt.correct).answer) {
            btn.style.backgroundColor = '#4caf50';
        }
    });

    if (currentIndex < questions.length - 1) {
        nextButton.style.display = 'block';
    } else {
        showResult();
    }
}

nextButton.addEventListener('click', () => {
    currentIndex++;
    nextButton.style.display = 'none';
    showQuestion();
});

function showResult() {
    optionsContainer.innerHTML = '';
    questionElement.textContent = "Quiz Completed!";
    questionNumberElement.textContent = '';
    resultContainer.style.display = 'block';
    scorePercentageElement.textContent = `Your score: ${(score / questions.length) * 100}%`;
    restartButton.style.display = 'block';
}

restartButton.addEventListener('click', startQuiz);

startQuiz();
