import React, { useState } from 'react';

const Quiz = () => {
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
        "Istanbul, Turkiet",
        "Bali, Indonesien",
        "Paris, Frankrike",
        "Zermatt, Schweiz",
    ]

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);

    const selectOption = (optionIndex) => {
        setUserAnswers([...userAnswers, optionIndex]);
        setCurrentQuestion(currentQuestion + 1);
    }

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setUserAnswers([]);
        setShowResult(false);
        setShowQuiz(false);
    }

    const startQuiz = () => {
        setShowQuiz(true);
    }
 
    const totalOptions = userAnswers.reduce((acc, curr) => acc + curr, 0);
    const destinationIndex = totalOptions % destinations.length;

    return (
        <div>
            {!showQuiz && !showResult && <button onClick={startQuiz}>Starta quiz</button>}
            {showQuiz && currentQuestion < questions.length && (
                <div>
                    <p>{questions[currentQuestion].question}</p>
                    <button onClick={() => selectOption(0)}>{questions[currentQuestion].options[0]}</button>
                    <button onClick={() => selectOption(1)}>{questions[currentQuestion].options[1]}</button>
                </div>
            )}
            {currentQuestion === questions.length && (
                <div>
                    <h2>Ditt resmål: {destinations[destinationIndex]}</h2>
                    <button onClick={restartQuiz}>Starta om quiz</button>
                </div>
            )}
        </div>
    );
}

export default Quiz;