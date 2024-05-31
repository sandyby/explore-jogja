import { useState } from 'react'
import { Typewriter } from 'react-simple-typewriter'
import BackToMapButton from '../components/Buttons/BackToMapButton'
import goaPindul from '../assets/goa-pindul-assets/goa-pindul-2.jpg'
import InteractionCarousel from '../components/Carousel/InteractionCarousel'
import InteractionCarouselButton from '../components/Buttons/InteractionCarouselButton'
import EnergyBar from '../components/UserStatus/EnergyBar'
import HappinessBar from '../components/UserStatus/HappinessBar'
import Balance from '../components/UserStatus/Balance'
import './Pindul.css'
import GoaPindulDataSet from '../components/Carousel/GoaPindulData'

export default function Map() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className='background'>
                <div className="bars">
                    <EnergyBar maxEgy={100} />
                    <HappinessBar maxHap={100} />
                    <Balance />
                </div>
                <div className="meaning p-3 rounded-3">
                    <span className='fs-5'>
                        <Typewriter
                            words={[
                                'Selamat Datang di Goa Pindul!',
                                'Goa ini terletak di Desa Bejiharjo, ± sekitar 1 jam dari kota Jogja.',
                                'Goa ini memiliki aliran Sungai bawah tanah di Gunung Kidul.',
                                'Goa Pindul memiliki panjang sekitar 350 meter dan kedalaman air sekitar 5 meter, menciptakan pengalaman petualangan yang menyenangkan bagi pengunjung.',
                                'Aktivitas seperti Cave Tubing, sangat direkomendasikan ketika kita mengunjungi goa tersebut.',
                                'Sembari di dalam, kita bisa menikmati ornamen cantik seperti kristal, moonmilk, serta stalaktit yang indah.',
                                'Kerennya, di dalam goa ini, ada stalaktit terbesar ke-4 di dunia loh!',
                                'dan konon katanya, tetesan air dari skalaktit yang berada di Goa Pindul bisa menjadikan pengujung awet muda.',
                                'Wahhh, kayaknya banyak ibu-ibu yang tertarik nihh!',
                                'Namun sayangnya, hal itu hanya sebuah mitos yang masih diyakini sampai sekarang',
                            ]}
                            loop={''}
                            typeSpeed={40}
                            deleteSpeed={10}
                            delaySpeed={5000}
                        />
                    </span>
                </div>
                <div className="pindul" style={{ backgroundImage: `url(${goaPindul})` }}></div>
            </div>
            <BackToMapButton />
            <InteractionCarouselButton openCarousel={() => setIsModalOpen(true)} />
            {isModalOpen && <>
                <InteractionCarousel closeCarousel={() => setIsModalOpen(false)} dataSet={GoaPindulDataSet} />
            </>}
        </>
    )
}