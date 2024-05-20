import { useContext, useState, useEffect } from "react";
import QuizModalPrompt from "../Modals/Quiz/QuizModalPrompt";
import quiz from '../../assets/game-quiz.png';
import './QuizButton.css';

export default function QuizButton({ openQuiz, energi }) {
    const [isShowing, setIsShowing] = useState(false);

    return (
        <>
            {isShowing && <QuizModalPrompt closePrompt={() => { setIsShowing(!isShowing) }} openQuiz={openQuiz} biaya={0} energi={energi} />}
            <div className="quiz-btn-container position-absolute">
                <button className="quiz border-0 rounded-3 p-2" onClick={() => setIsShowing(true)}><img className="quiz-img" src={quiz} alt="Quiz" /></button>
            </div>
        </>
    );
}
