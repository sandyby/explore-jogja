import { useRef, useEffect, useContext, useState } from "react";
import { BalanceContext } from "../../../contexts/BalanceContext";
import { RainyContext } from "../../../contexts/RainyContext";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import AOS from "aos";
import 'aos/dist/aos.css';
import './PinPrompt.css'

export default function PinPrompt({ dest, target, biaya, closePrompt }) {
    const modalRef = useRef(null);
    const [isBalanceEnough, setIsBalanceEnough] = useState(true);
    const { currMoney, setCurrMoney } = useContext(BalanceContext);
    const { showRainyModal, setShowRainyModal } = useContext(RainyContext);

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

    const costHandler = () => {
        setCurrMoney(prevMoney => prevMoney - biaya);
    }

    useEffect(() => {
        if (currMoney < biaya) {
            setIsBalanceEnough(false);
        }
    }, [biaya, currMoney]);

    useEffect(() => {
        AOS.init();
    }, [])

    return createPortal(
        <>
            <div className="pin-prompt-modal-overlay" data-aos='zoom-out'>
                <div className="pin-prompt-modal-container" ref={modalRef}>
                    <div className="pin-prompt-modal-header-container">
                        <h2>Perjalanan menuju ke {dest} memakan biaya sebesar:</h2>
                        <h4>🪙{biaya}</h4>
                    </div>
                    <div className="pin-prompt-modal-content-container">
                        {!isBalanceEnough && <div className="not-enough-balance">
                            <h3>Uang Tidak Cukup!</h3>
                            <div className="pin-prompt-disagree-btn-container">
                                <button className="disagree-btn btn btn-danger" onClick={closePrompt}>Kembali</button>
                            </div>
                        </div>}
                        {isBalanceEnough && <div className="enough-balance">
                            <div className="pin-prompt-disagree-btn-container">
                                <button className="disagree-btn btn btn-danger" onClick={closePrompt}>Kembali</button>
                            </div>
                            <Link to={target}>
                                <div className="pin-prompt-agree-btn-container">
                                    {/* kalo hujan: */}
                                    <button className="agree-btn btn btn-success" onClick={() => { costHandler(); setShowRainyModal(true) }}>Pergi</button>
                                    {/* kalo ga hujan: */}
                                    {/* <button className="agree-btn btn btn-success" onClick={() => {costHandler(); setShowRainyModal(false)}}>Pergi</button> */}
                                </div>
                            </Link>
                        </div>}
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}
