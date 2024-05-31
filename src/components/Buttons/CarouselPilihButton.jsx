import { useState, useContext, useEffect } from 'react'
import { BalanceContext } from '../../contexts/BalanceContext';
import { EnergyContext } from '../../contexts/EnergyContext';
import { HappinessContext } from '../../contexts/HappinessContext';
import './CarouselPilihButton.css'

export default function CarouselPilihButton({ kegiatan, biaya, energi, happiness, closeCarousel, isHotel }) {
    const [isEnergyEnough, setIsEnergyEnough] = useState(true);
    const [isBalanceEnough, setIsBalanceEnough] = useState(true);
    const { currMoney, setCurrMoney } = useContext(BalanceContext);
    const { currEgy, setCurrEgy } = useContext(EnergyContext);
    const { currHap, setCurrHap } = useContext(HappinessContext);

    useEffect(() => {
        if (energi < 0) {
            if (currEgy < Math.abs(energi)) {
                setIsEnergyEnough(false);
            }
        } else {
            setIsEnergyEnough(true);
        }
        if (currMoney < biaya) {
            setIsBalanceEnough(false);
        }
    }, [currMoney, currEgy, biaya]);

    const pilihHandler = () => {
        // console.log(currEgy);
        // console.log(energi);
        setCurrEgy(prevEgy => (prevEgy + energi > 100 ? 100 : (prevEgy + energi)));
        setCurrMoney(prevMoney => prevMoney - biaya);
        const happinessGet = happiness;
        setCurrHap(prevHap => (prevHap + happinessGet > 100 ? 100 : (prevHap + happinessGet)));
    }

    return (
        <>
            {isHotel &&
                <>
                    {!isBalanceEnough && <div className="carousel-kegiatan-pilih-not-enough-balance">
                        <h3 className='carousel-kegiatan-pilih-status'>Uang Tidak Cukup!</h3>
                    </div>}
                    {isBalanceEnough && <div className="carousel-kegiatan-pilih-enough-balance">
                        <div className="carousel-kegiatan-pilih-btn-container">
                            <button className="carousel-kegiatan-pilih-btn btn-warning btn" onClick={() => { pilihHandler(); closeCarousel() }}>🪙{biaya}</button>
                        </div>
                    </div>}
                </>
            }
            {!isHotel &&
                <>
                    {!isBalanceEnough && isEnergyEnough && <div className="carousel-kegiatan-pilih-not-enough-balance">
                        <h3 className='carousel-kegiatan-pilih-status-1'>Uang Tidak Cukup!</h3>
                    </div>}
                    {isBalanceEnough && isEnergyEnough && <div className="carousel-kegiatan-pilih-enough-balance-and-enough-energy">
                        <div className="carousel-kegiatan-pilih-btn-container">
                            {energi > 0 ?
                                <button className="carousel-kegiatan-pilih-btn btn-warning btn" onClick={() => { pilihHandler(); closeCarousel() }}>🪙{biaya}</button>
                                :
                                <button className="carousel-kegiatan-pilih-btn btn-warning btn" onClick={() => { pilihHandler(); closeCarousel() }}>🪙{biaya}⚡{Math.abs(energi)}</button>
                            }
                        </div>
                    </div>}
                    {!isEnergyEnough && isBalanceEnough && <div className="carousel-kegiatan-pilih-not-enough-energy-and-not-enough-balance">
                        <h3 className='carousel-kegiatan-pilih-status-3 '>Energi Tidak Cukup!</h3>
                    </div>}
                    {!isEnergyEnough && !isBalanceEnough && <div className="carousel-kegiatan-pilih-not-enough-energy-and-not-enough-balance2">
                        <h3 className='carousel-kegiatan-pilih-status-2'>Energi dan Uang Tidak Cukup!</h3>
                    </div>}
                </>
            }
        </>
    )
}
