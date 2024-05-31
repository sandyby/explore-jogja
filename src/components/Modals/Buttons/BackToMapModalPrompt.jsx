import { createPortal } from "react-dom"
import { useRef, useEffect, useContext, useState } from "react"
import { Link } from "react-router-dom";
import { RainyContext } from '../../../contexts/RainyContext'
import AOS from 'aos';
import 'aos/dist/aos.css';
import './BackToMapModalPrompt.css'

export default function BackToMapModalPrompt({ closePrompt }) {
    const modalRef = useRef(null);
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

    useEffect(() => {
        AOS.init();
    }, [])

    return createPortal(
        <>
            <div className="back-to-map-prompt-modal-overlay" data-aos='zoom-out'>
                <div className="back-to-map-prompt-modal-container" ref={modalRef}>
                    <div className="back-to-map-prompt-modal-header-container">
                        <h2 data-aos='fade-down' data-aos-duration='1000'>Kembali Ke Peta?</h2>
                    </div>
                    <div className="back-to-map-prompt-modal-content-container d-flex justify-content-center">
                        <div className="back-to-map-prompt-disagree-btn-container me-1">
                            <button data-aos='fade-up' className="disagree-btn btn btn-danger" onClick={closePrompt}>Kembali</button>
                        </div>
                        <div className="back-to-map-prompt-agree-btn-container">
                            {/* kalo hujan: */}
                            <Link to="/map">
                                <button data-aos='fade-up' className="agree-btn btn btn-success" onClick={() => { setShowRainyModal(true) }}>Ya</button>
                            </Link>
                            {/* kalo ga hujan: */}
                            {/* <Link to="/map">
                                <button data-aos='fade-up' className="agree-btn btn btn-success ms-1" onClick={() => { setShowRainyModal(false) }}>Ya</button>
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}

