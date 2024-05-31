import { useState } from 'react'
import { Typewriter } from 'react-simple-typewriter'
import BackToMapButton from '../components/Buttons/BackToMapButton'
import parangtritis from '../assets/pantai-parangtritis-assets/sunset.jpg'
import InteractionCarousel from '../components/Carousel/InteractionCarousel'
import PantaiParangtritisDataSet from '../components/Carousel/PantaiParangtritisData'
import InteractionCarouselButton from '../components/Buttons/InteractionCarouselButton'
import EnergyBar from '../components/UserStatus/EnergyBar'
import HappinessBar from '../components/UserStatus/HappinessBar'
import Balance from '../components/UserStatus/Balance'
import './Parangtritis.css'

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
                                'Selamat datang di Pantai Parangtritis!',
                                'Pantai Parangtritis terletak Kelurahan Parangtritis, kecamatan Kretek, Kabupaten Bantul, Daerah Istimewa Yogyakarta.',
                                'Letak Pantai Parangtritis hanya berjarak ± sekitar 28 km dari kota Yogyakarta.',
                                'Keunikan pantai ini diperkaya oleh mitos dan legenda lokal, termasuk hubungan spiritual dengan Keraton Yogyakarta yang menambah dimensi magis pada kunjungan Anda.',
                                'Mitos yang beredar di antara masyarakat setempat, seperti larangan mengenakan pakaian berwarna hijau dan berenang di laut, mengajarkan pengunjung untuk menghormati alam serta budaya setempat.',
                                'Kepercayaan terhadap Nyi Roro Kidul, penguasa spiritual Laut Selatan, menambahkan nuansa mistis dan mendidik pengunjung tentang pentingnya menghargai tradisi yang telah turun-temurun.',
                                'Pantai Parangtritis tidak hanya menjanjikan keindahan alam, tetapi juga pengalaman mendalam akan cerita dan tradisi Yogyakarta.',
                                'Faktanya adalah, pantai ini memiliki pasir hitam yang berasal dari material vulkanik yang dihasilkan oleh erupsi Gunung Merapi pada tahun 2010.',
                            ]}
                            loop={''}
                            typeSpeed={40}
                            deleteSpeed={1}
                            delaySpeed={2000}
                        />
                    </span>
                </div>
                <div className="parangtritis" style={{ backgroundImage: `url(${parangtritis})` }}></div>
            </div>
            <BackToMapButton />
            <InteractionCarouselButton openCarousel={() => setIsModalOpen(true)} />
            {isModalOpen && <>
                <InteractionCarousel closeCarousel={() => setIsModalOpen(false)} dataSet={PantaiParangtritisDataSet} />
            </>}
        </>
    )
}