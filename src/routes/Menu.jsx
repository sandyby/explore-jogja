import React, { useState, useEffect, useContext } from "react"
import { Typewriter } from "react-simple-typewriter";
import { Link } from 'react-router-dom';
import { RainyContext } from "../contexts/RainyContext";
import AOS from 'aos'
import 'aos/dist/aos.css'
import tugu from '../assets/tugu.avif'
import Credits from "../components/Modals/Credits/Credits";
import LogoYogya from '../assets/logo-yogyakarta.svg'
import LogoUMN from '../assets/umn.png'
import './Menu.css'

export default function Menu() {
    const [isCredits, setCredits] = useState(false);
    const { showRainyModal, setShowRainyModal } = useContext(RainyContext);

    useEffect(() => {
        AOS.init();
    }, [])

    // const superpower = 'Daerah Istimewa Yogyakarta'

    // const [typedSuperpower, setTypedSuperpower] = useState('')
    // useEffect(() => {

    //     const timeout = setTimeout(() => {
    //         setTypedSuperpower(superpower.slice(0, typedSuperpower.length + 1))
    //     }, 150)
    //     return () => clearTimeout(timeout)
    // }, [typedSuperpower])
    //     words: ['Daerah Istimewa Yogyakarta'],
    //     loop: {},
    //     typeSpeed: 100,
    //     deleteSpeed: 50,
    // });
    return (
        <>
            {/* <h1>{typedSuperpower}</h1> */}
            {/* <Typical
                    steps={['Daerah Istimewa Yogyakarta', 5000, 500]}
                    loop={Infinity}
                    wrapper="h1"
                /> */}
            {/* <h1 className="title">Daerah Istimewa Yogyakarta</h1> */}
            <div className="logo-container" data-aos='fade-down' data-aos-duration='2000'>
                <div className="logo-yogya">
                    <img src={LogoYogya} alt="Lambang Yogyakarta" />
                </div>
                <div className="logo-yogya">
                    <img src={LogoUMN} alt="Logo UMN" />
                </div>
            </div>
            <div className="title-container">
                <p className='title'>
                    <span>
                        <Typewriter
                            words={['Daerah Istimewa Yogyakarta']}
                            loop={''}
                            // cursor
                            typeSpeed={100}
                            // deleteSpeed={10}
                            delaySpeed={3000}
                        />
                    </span>
                </p >
            </div >
            <div className="menu-background-container" data-aos='zoom-out' data-aos-duration='1500' style={{ backgroundImage: `url(${tugu})`, backgroundSize: "cover", opacity: 0.8 }}>
            </div>
            <div className="menu-container mt-2">
                <div className="start-btn-container">
                    <Link to="/map">
                        {/* kalo hujan: */}
                        <button data-aos='zoom-in' data-aos-duration='2000' className="start-btn menu-btn text-white border-0 btn-lx" onClick={() => { setShowRainyModal(true) }}>Start Exploring!</button>
                        {/* kalo ga hujan: */}
                        {/* <button data-aos='zoom-in' data-aos-duration='2000' className="start-btn menu-btn text-white border-0 btn-lx" onClick={() => {setShowRainyModal(false)}}>Start Exploring!</button> */}
                    </Link>
                </div>
                <div className="credits-btn-container">
                    {/* <button className="credits-btn menu-btn btn" onClick={toggleCredits}>Credits</button> */}
                    <button data-aos='zoom-in' data-aos-duration='2000' className="credits-btn menu-btn text-white border-0 btn-lx" onClick={() => setCredits(!isCredits)}>Credits</button>
                </div>
                {isCredits && <Credits closeCredits={() => setCredits(!isCredits)} />}
            </div>
        </>
    )
}