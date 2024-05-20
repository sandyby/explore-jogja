import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import foto from '../../../assets/back-card.png';
import instagram from '../../../assets/Instagram.png';
import './Credits.css';

function Credits({ closeCredits }) {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeCredits();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [closeCredits]);

    useEffect(() => {
        AOS.init();
    }, [])

    return createPortal(
        <>
            <div className="credits-modal-overlay">
                <div className="credits-modal-container" ref={modalRef}>
                    <div className="credits-modal-header">
                        <h2 className='text-white' data-aos='fade-down'>Credits</h2>
                    </div>
                    <div className="close-credits-modal-btn-container">
                        <button data-aos='fade-down-left' className='close-credits-modal-btn btn fs-1 p-0' onClick={closeCredits}>&times;</button>
                    </div>
                    <div>
                        <div data-aos='fade-up' className="credits-modal-content d-flex flex-wrap gap-3 justify-content-center">
                            <div className='credits rounded-2'>
                                <div className='credits-foto'><img className='profil rounded-circle' src={foto} alt="" /></div>
                                <div className='credits-nama'>
                                    <h4>Jennifer Maria Daniella Kastilong</h4>
                                    <h5>00000106205</h5>
                                    <a className='insta-text text-black text-decoration-none' href="https://www.instagram.com/jenniferk_05/">
                                        <img className='insta' src={instagram} alt="Instagram" /> @jenniferk_05
                                    </a>
                                </div>
                            </div>
                            <div className='credits-2 rounded-2'>
                                <div className='credits-foto'><img className='profil rounded-circle' src={foto} alt="" /></div>
                                <div className='credits-nama-2'>
                                    <h4>Rafi Ghadhanfar Muhammad</h4>
                                    <h5>00000108353</h5>
                                    <a className='insta-text text-black text-decoration-none' href="https://www.instagram.com/27__rgm/">
                                        <img className='insta' src={instagram} alt="Instagram" /> @27__rgm
                                    </a>
                                </div>
                            </div>
                            <div className='credits-3 rounded-2'>
                                <div className='credits-foto'><img className='profil rounded-circle' src={foto} alt="" /></div>
                                <div className='credits-nama-3'>
                                    <h4>Sandy Bonfilio Yuvens</h4>
                                    <h5>00000106442</h5>
                                    <a className='insta-text text-black text-decoration-none' href="https://www.instagram.com/xxsandyb/">
                                        <img className='insta' src={instagram} alt="Instagram" /> @xxsandyb
                                    </a>
                                </div>
                            </div>
                            <div className='credits-4 rounded-2'>
                                <div className='credits-foto'><img className='profil rounded-circle' src={foto} alt="" /></div>
                                <div className='credits-nama-4'>
                                    <h4>Muhamad Tarekh</h4>
                                    <h5>00000108776</h5>
                                    <a className='insta-text text-black text-decoration-none' href="https://www.instagram.com/m.trekh/">
                                        <img className='insta' src={instagram} alt="Instagram" /> @m.trekh
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default Credits;