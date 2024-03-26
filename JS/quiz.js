const questions = [
	{
		question: "Vilken typ av klimat föredrar du?",
		options: ["Varmt och soligt", "Svalt och tempererat"],
	},
	{
		question: "Vilken typ av aktiviteter föredrar du?",
		options: ["Strand och vattensport", "Vandring och naturupplevelser"],
	},
	{
		question: "Hur lång tid har du för din resa?",
		options: ["En vecka eller mindre", "Mer än en vecka"],
	},
]

const destinations = [
	"Miami, Florida, USA",
	"Bali, Indonesien",
	"Alperna, Schweiz",
	"Phuket, Thailand",
]

let currentQuestion = 0
let userAnswers = []

const questionElement = document.getElementById("question")
const option1Element = document.getElementById("option1")
const option2Element = document.getElementById("option2")
const resultElement = document.getElementById("result")
const resultContainer = document.getElementById("result-container")
const questionContainer = document.getElementById("question-container")

function showNextQuestion() {
	if (currentQuestion < questions.length) {
		questionElement.textContent = questions[currentQuestion].question
		option1Element.textContent = questions[currentQuestion].options[0]
		option2Element.textContent = questions[currentQuestion].options[1]
	} else {
		showResult()
	}
}

function selectOption(optionIndex) {
	userAnswers.push(optionIndex)
	currentQuestion++
	showNextQuestion()
}

function showResult() {
	const totalOptions = userAnswers.reduce((acc, curr) => acc + curr, 0)
	const destinationIndex = totalOptions % destinations.length
	resultElement.textContent = "Ditt resmål: " + destinations[destinationIndex]
	resultContainer.style.display = "block"
	questionContainer.style.display = "none"
}

function restartQuiz() {
	currentQuestion = 0
	userAnswers = []
	resultContainer.style.display = "none"
	questionContainer.style.display = "block"
	showNextQuestion()
}

showNextQuestion()

document.getElementById("question-container").style.display = "none"
document.getElementById("result-container").style.display = "none"

function startQuiz() {
	document.getElementById("start-btn").style.display = "none"
	document.getElementById("question-container").style.display = "block"
	showNextQuestion()
}
