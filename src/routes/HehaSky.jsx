import { useState } from 'react'
import { Typewriter } from 'react-simple-typewriter'
import BackToMapButton from '../components/Buttons/BackToMapButton'
import hehaSky from '../assets/heha-sky-view-assets/heha-sky-view.jpeg'
import InteractionCarousel from '../components/Carousel/InteractionCarousel'
import HehaSkyViewDataSet from '../components/Carousel/HehaSkyViewData'
import InteractionCarouselButton from '../components/Buttons/InteractionCarouselButton'
import EnergyBar from '../components/UserStatus/EnergyBar'
import HappinessBar from '../components/UserStatus/HappinessBar'
import Balance from '../components/UserStatus/Balance'
import './HehaSky.css'

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
                                'Selamat datang di HeHa Sky View!',
                                'HeHa Sky View merupakan destinasi wisata populer di Kecamatan Patuk, Kabupaten Gunung Kidul yang menawarkan pemandangan spektakuler dari ketinggian.',
                                'Berawal dari pembangunan dengan tujuan memberikan pengalaman berwisata yang unik kepada pengunjung, tempat ini menjadi favorit di antara wisatawan yang berkunjung ke Yogyakarta.',
                                'Wisatawan akan termanjakan dengan pemandangan yang menabjukan dari puncak HeHa Sky View.',
                                'Pengunjung dapat menikmati panorama alam yang begitu indah, dari pemandangan lembah hijau, perbukitan, bahkan Gunung Merapi yang megah.',
                            ]}
                            loop={''}
                            typeSpeed={40}
                            deleteSpeed={10}
                            delaySpeed={5000}
                        />
                    </span>
                </div>
                <div className="hehasky" style={{ backgroundImage: `url(${hehaSky})` }}></div>
            </div>
            <BackToMapButton />
            <InteractionCarouselButton openCarousel={() => setIsModalOpen(true)} />
            {isModalOpen && <>
                <InteractionCarousel closeCarousel={() => setIsModalOpen(false)} dataSet={HehaSkyViewDataSet} />
            </>}
        </>
    )
}