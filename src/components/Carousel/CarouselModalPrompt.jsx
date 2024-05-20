import { createPortal } from "react-dom"
import { useRef, useEffect, useContext, useState } from "react"
import { BalanceContext } from "../../contexts/BalanceContext";
import './CarouselModalPrompt.css'

export default function CarouselModalPrompt({ openPrompt, isShowing, closePrompt, kegiatan, biaya }) {
    // const modalRef = useRef(null);
    const [isBalanceEnough, setIsBalanceEnough] = useState(true);
    const [isDone, setIsDone] = useState(false);
    const { currMoney, setCurrMoney } = useContext(BalanceContext);

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (modalRef.current && !modalRef.current.contains(event.target)) {
    //             closePrompt();
    //         }
    //     };
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, [closePrompt]);

    const playHandler = () => {
        setCurrMoney(prevMoney => prevMoney - biaya);
    }

    useEffect(() => {
        if (currMoney < biaya) {
            setIsBalanceEnough(false);
        }
    }, [currMoney, biaya]);

    return createPortal(
        <>
            <div className="carousel-user-agree-prompt-modal-overlay">
                {/* <div className="carousel-user-agree-prompt-modal-container" ref={modalRef}> */}
                <div className="carousel-user-agree-prompt-modal-container">
                    {!isDone &&
                        <>
                            <div className="carousel-user-agree-prompt-modal-header-container">
                                <h3>Kegiatan {kegiatan} memakan biaya sebesar:</h3>
                                <h4>Biaya: 🪙{biaya}</h4>
                            </div>
                            <div className="carousel-user-agree-prompt-modal-content-container">
                                {!isBalanceEnough && <div className="carousel not-enough-balance">
                                    <h3>Uang Tidak Cukup!</h3>
                                    <div className="carousel-user-agree-prompt-disagree-btn-container">
                                        <button className="disagree-btn btn btn-danger" onClick={closePrompt}>Kembali</button>
                                    </div>
                                </div>}
                                {isBalanceEnough && <div className="carousel-enough-balance">
                                    <div className="carousel-user-agree-prompt-disagree-btn-container">
                                        <button className="disagree-btn btn btn-danger" onClick={closePrompt}>Kembali</button>
                                    </div>
                                    <div className="carousel-user-agree-prompt-agree-btn-container">
                                        <button className="agree-btn btn btn-success" onClick={() => { playHandler(); setIsDone(true); }}>Mau</button>
                                    </div>
                                </div>}
                            </div>
                        </>
                    }
                    {isDone &&
                        <>
                            <div className="yey">
                                <div className="carousel-user-agree-prompt-modal-header-container" onClick={closePrompt}>
                                    <h3>Kamu telah melakukan kegiatan {kegiatan}!</h3>
                                    <h3>Happiness kamu bertambah sebesar:</h3>
                                    <h4>😁{biaya}</h4>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}
