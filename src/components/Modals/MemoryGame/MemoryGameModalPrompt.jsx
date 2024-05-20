import { createPortal } from "react-dom"
import { useRef, useEffect, useContext, useState } from "react"
import { BalanceContext } from "../../../contexts/BalanceContext";
import { EnergyContext } from "../../../contexts/EnergyContext";
import { IntervalContext } from "../../../contexts/IntervalContext";
import AOS from 'aos';
import 'aos/dist/aos.css';
import './MemoryGameModalPrompt.css'

export default function MemoryGameModalPrompt({ closePrompt, openMemoryGame, biaya, energi }) {
    const modalRef = useRef(null);
    const [isBalanceEnough, setIsBalanceEnough] = useState(true);
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
        setCurrEgy(prevEgy => prevEgy - 50);
        setIsIntervalActive(false);
    }

    useEffect(() => {
        if (currEgy < 5) {
            setIsEnergyEnough(false);
        }
        if (currMoney < biaya) {
            setIsBalanceEnough(false);
        }
    }, [currMoney, currEgy, biaya]);

    useEffect(() => {
        AOS.init();
    }, [])

    return createPortal(
        <>
            <div className="user-agree-prompt-modal-overlay" data-aos='zoom-out'>
                <div className="user-agree-prompt-modal-container" ref={modalRef}>
                    <div className="user-agree-prompt-modal-header-container">
                        <h2 data-aos='fade-down' data-aos-duration='1000'>Main Memory Game?</h2>
                        <h4 data-aos='zoom-in' data-aos-duration='1000'>🪙{biaya}⚡{energi}</h4>
                    </div>
                    <div className="user-agree-prompt-modal-content-container">
                        {!isBalanceEnough && isEnergyEnough && <div className="not-enough-balance">
                            <h3>Uang Tidak Cukup!</h3>
                            <div className="user-agree-prompt-disagree-btn-container">
                                <button className="disagree-btn btn btn-danger" onClick={closePrompt}>Kembali</button>
                            </div>
                        </div>}
                        {isBalanceEnough && isEnergyEnough && <div className="enough-balance-and-enough-energy">
                            <div className="user-agree-prompt-disagree-btn-container">
                                <button data-aos='fade-up' className="disagree-btn btn btn-danger" onClick={closePrompt}>Kembali</button>
                            </div>
                            <div className="user-agree-prompt-agree-btn-container">
                                <button data-aos='fade-up' className="agree-btn btn btn-success" onClick={() => { playHandler(); closePrompt(); openMemoryGame() }}>Ya</button>
                            </div>
                        </div>}
                        {!isEnergyEnough && isBalanceEnough && <div className="not-enough-energy">
                            <h3>Energi Tidak Cukup!</h3>
                            <div className="user-agree-prompt-disagree-btn-container">
                                <button className="disagree-btn btn btn-danger" onClick={closePrompt}>Kembali</button>
                            </div>
                        </div>}
                        {!isEnergyEnough && !isBalanceEnough && <div className="not-enough-energy-and-not-enough-balance">
                            <h3>Energi dan Uang Tidak Cukup!</h3>
                            <div className="user-agree-prompt-disagree-btn-container">
                                <button className="disagree-btn btn btn-danger" onClick={closePrompt}>Kembali</button>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}
