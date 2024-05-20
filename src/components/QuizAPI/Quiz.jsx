import { useState, useContext, useEffect } from "react";
import { createPortal } from 'react-dom'
import { resultInit } from "./questions";
import { BalanceContext } from "../../contexts/BalanceContext";
import { HappinessContext } from "../../contexts/HappinessContext";
import { IntervalContext } from "../../contexts/IntervalContext";
import './Quiz.css'

const Quiz = ({ questions, closeQuiz }) => {
    const [currQuestion, setCurrQuestion] = useState(0);
    const [answerIdx, setAnswerIndex] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [result, setResult] = useState(resultInit);
    const [showResult, setShowResult] = useState(false);
    const { currMoney, setCurrMoney } = useContext(BalanceContext);
    const { currHap, setCurrHap } = useContext(HappinessContext);
    const { isIntervalActive, setIsIntervalActive } = useContext(IntervalContext);

    const { question, choices, correctAnswer } = questions[currQuestion];

    const onAnswerClick = (answer, index) => {
        setAnswerIndex(index);
        if (answer === correctAnswer) {
            setAnswer(true);
        }
        else setAnswer(false);
    };

    const onNextClick = () => {
        setAnswerIndex(null);
        setResult((prev) =>
            answer ? {
                ...prev,
                score: prev.score + 20,
                correctAsw: prev.correctAsw + 1,
            } : {
                ...prev,
                wrongAsw: prev.wrongAsw + 1,
            }
        );

        if (currQuestion !== questions.length - 1) {
            setCurrQuestion(currQuestion + 1);
        } else {
            setCurrQuestion(0);
            setShowResult(true);
        }
    }

    useEffect(() => {
        if (showResult) {
            answerHandler();
        }
    }, [showResult]);

    const answerHandler = () => {
        const balanceGet = result.correctAsw * 40000;
        setCurrMoney(prevCurrMoney => {
            const newBalance = prevCurrMoney + balanceGet;
            localStorage.setItem("userBalance", newBalance);
            return newBalance;
        });
        const happinessGet = result.correctAsw === 5 ? result.correctAsw * 3.5 : result.correctAsw * 2.5;
        setCurrHap(prevHap => (prevHap + happinessGet > 100) ? 100 : (prevHap + happinessGet));
        setIsIntervalActive(true);
    };

    return createPortal(
        <>
            <div className="quiz-modal-overlay">
                <div className="quiz-modal-container">
                    <div className="quiz-container">
                        {!showResult ? (
                            <>
                                <h1>
                                    <span className="active-question-num">{currQuestion + 1}</span>
                                    <span className="tot-question">/{questions.length}</span>
                                </h1>
                                <h1>Question</h1>
                                <h3>{question}</h3>
                                <ul>
                                    {
                                        choices.map((answer, index) => (
                                            <li onClick={() => onAnswerClick(answer, index)} key={answer}
                                                className={answerIdx === index ? "selected-answer" : null}>
                                                {answer}
                                            </li>
                                        ))
                                    }
                                </ul>
                                <div className="footer">
                                    <button className="next-fin" onClick={onNextClick} disabled={answerIdx === null}>
                                        {currQuestion === questions.length - 1 ? "Finish" : "Next"}
                                    </button>
                                </div>
                            </>
                        )
                            : <div className="result">
                                <div className="close-quiz-btn-container">
                                    <button className="close-quiz-btn border-0 rounded-2 fs-3" onClick={closeQuiz}>&times;</button>
                                </div>
                                <h2>Result</h2>
                                <p>
                                    Total Questions: {questions.length}
                                </p>
                                <p>
                                    Total Score: {result.score}
                                </p>
                                <p>
                                    Correct Answers: {result.correctAsw}
                                </p>
                                <p>
                                    Wrong Answers: {result.wrongAsw}
                                </p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    );
}

export default Quiz;