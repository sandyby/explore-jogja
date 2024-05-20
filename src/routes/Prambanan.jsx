import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Typewriter } from 'react-simple-typewriter'
import BackToMapButton from '../components/Buttons/BackToMapButton'
// import prambanan from '../assets/temp-assets/prambanan-uhuy.PNG'
import prambanan from '../assets/prambanan-assets/prambanan-2.jpg'
import InteractionCarousel from '../components/Carousel/InteractionCarousel'
import PrambananDataSet from '../components/Carousel/PrambananData'
import InteractionCarouselButton from '../components/Buttons/InteractionCarouselButton'
import EnergyBar from '../components/UserStatus/EnergyBar'
import HappinessBar from '../components/UserStatus/HappinessBar'
import Balance from '../components/UserStatus/Balance'
import './Prambanan.css'

export default function Map() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [counter, setCounter] = useState(0);

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
                                'Selamat Datang di Candi Prambanan!',
                                'Candi Prambanan merupakan Candi Hindu terbesar di Indonesia loh!',
                                'Candi ini terletak kira-kira 17km dari kota Yogyakarta, dan berada di perbatasan antara DIY dan Jawa Tengah, tepatnya antara Sleman dan Klaten. ',
                                'Tinggi candi ini mencapai 47 meter yang di bangun pada masa dinasti Sanjaya abad ke-9.',
                                'Candi Utama memiliki tiga kuil untuk menyembah dewa hindu yaitu Dewa Siwa, Dewa Wisnu, dan Dewa Brahma.',
                                'Masing-masing kuil tersebut menghadap ke sebuah kuil kecil sebagai kendaraan 3 Dewa Hindu tersebut.'
                            ]}
                            loop={''}
                            typeSpeed={40}
                            deleteSpeed={1}
                            delaySpeed={2000}
                        />
                    </span>
                </div>
                <div className="prambanan" style={{ backgroundImage: `url(${prambanan})` }}></div>
            </div>
            <BackToMapButton />
            <InteractionCarouselButton openCarousel={() => setIsModalOpen(true)} />
            {isModalOpen && <>
                <InteractionCarousel closeCarousel={() => setIsModalOpen(false)} dataSet={PrambananDataSet} />
            </>}
        </>
    )
}