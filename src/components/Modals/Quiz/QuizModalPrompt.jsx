/* eslint-disable no-unused-vars */
import { createPortal } from "react-dom"
import { useRef, useEffect, useContext, useState } from "react"
import { BalanceContext } from "../../../contexts/BalanceContext";
import { EnergyContext } from "../../../contexts/EnergyContext";
import { IntervalContext } from "../../../contexts/IntervalContext";
import AOS from "aos";
import 'aos/dist/aos.css';
import './QuizModalPrompt.css'

export default function QuizModalPrompt({ closePrompt, openQuiz, biaya, energi }) {
    const modalRef = useRef(null);
    const [isEnergyEnough, setIsEnergyEnough] = useState(true);
    const { currMoney, setCurrMoney } = useContext(BalanceContext);
    const { currEgy, setCurrEgy } = useContext(EnergyContext);
    const { isIntervalActive, setIsIntervalActive } = useContext(IntervalContext);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closePrompt();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [closePrompt]);

    const playHandler = () => {
        setCurrMoney(prevMoney => prevMoney - biaya);
        setCurrEgy(prevEgy => prevEgy - energi);
        setIsIntervalActive(false);
    }

    useEffect(() => {
        AOS.init();
    }, [])

    useEffect(() => {
        if (currEgy < 5) {
            setIsEnergyEnough(false);
        } else {
            setIsEnergyEnough(true)
        }
    }, [currEgy, isEnergyEnough]);

    return createPortal(
        <>
            <div className="user-agree-prompt-modal-overlay" data-aos='zoom-out' data-aos-duration='500'>
                <div className="user-agree-prompt-modal-container" ref={modalRef}>
                    <div className="user-agree-prompt-modal-header-container">
                        <h2 data-aos='fade-down' data-aos-duration='1000'>Coba Quiz?</h2>
                        <h4 data-aos='zoom-in' data-aos-duration='1000'>🪙{biaya}⚡{energi}</h4>
                    </div>
                    <div className="user-agree-prompt-modal-content-container">
                        {!isEnergyEnough && <div className="not-enough-energy">
                            <h3>Energi Tidak Cukup!</h3>
                            <div className="pin-prompt-disagree-btn-container">
                                <button className="disagree-btn btn btn-danger" onClick={closePrompt}>Kembali</button>
                            </div>
                        </div>}
                        {isEnergyEnough && <div className="enough-energy">
                            <div className="disagree-btn-container">
                                <button data-aos='fade-up' data-aos-duration='1000' className="disagree-btn btn btn-danger" onClick={closePrompt}>Tidak</button>
                            </div>
                            <div className="agree-btn-container">
                                <button data-aos='fade-up' data-aos-duration='1000' className="agree-btn btn btn-success" onClick={() => { openQuiz(); closePrompt(); playHandler() }}>Ya</button>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}
