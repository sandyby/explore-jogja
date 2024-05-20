import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Typewriter } from 'react-simple-typewriter'
import BackToMapButton from '../components/Buttons/BackToMapButton'
import malioboro from '../assets/malioboro-assets/malioboro-4.jpg'
import InteractionCarousel from '../components/Carousel/InteractionCarousel'
import MalioboroDataSet from '../components/Carousel/MalioboroData'
import InteractionCarouselButton from '../components/Buttons/InteractionCarouselButton'
import EnergyBar from '../components/UserStatus/EnergyBar'
import HappinessBar from '../components/UserStatus/HappinessBar'
import Balance from '../components/UserStatus/Balance'
import './Malioboro.css'

export default function Map() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            {/* <div className="title-container">
                <h1>Daerah Istimewa Yogyakarta</h1>
            </div> */}
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
                                'Selamat datang di Jalan Malioboro!',
                                'Pasar Malioboro, terletak di jantung kota Yogyakarta, adalah salah satu pasar paling ikonik dan bersejarah di negara ini.',
                                'Nama "Malioboro" berasal dari nama kolonial "Marlborough," yang merupakan referensi terhadap Duke of Marlborough dari Inggris. ',
                                'Pasar ini adalah bukti hidup dari pertemuan budaya Jawa dengan pengaruh kolonial Belanda, yang masih dapat dirasakan dari arsitektur dan tata ruangnya.',
                                'Pasar Malioboro dikenal dengan kekayaan budaya dan sejarahnya yang panjang.',
                                'Berawal dari masa pemerintahan Sultan Hamengkubuwono I pada awal abad ke-19, pasar ini telah berkembang menjadi pusat kegiatan ekonomi dan sosial.',
                                'Selain itu, Malioboro juga merupakan tempat di mana seniman lokal memamerkan karya mereka, dari batik tradisional hingga kerajinan tangan unik.',
                                'Salah satu fakta menarik tentang Pasar Malioboro adalah perannya dalam perjuangan Indonesia melawan penjajah.',
                                'Area ini pernah menjadi pusat kegiatan politik dan pertemuan penting, khususnya selama masa revolusi kemerdekaan Indonesia.',
                                'Hari ini, Malioboro tidak hanya menjadi magnet bagi wisatawan yang ingin membeli barang-barang tradisional dan menikmati kuliner khas, ',
                                'tetapi juga tempat berkumpulnya masyarakat lokal dan seniman, menjadikannya simbol kekayaan budaya dan keberagaman Indonesia.',
                                'Faktanya, Pasar Malioboro adalah peranannya dalam perjuangan kemerdekaan Indonesia, dimana tempat ini menjadi lokasi strategis untuk pertemuan dan kegiatan politik.',
                                'Sampai hari ini, Malioboro tidak hanya menjadi pusat perdagangan, tetapi juga simbol kekayaan budaya dan sejarah Indonesia.',
                            ]}
                            loop={''}
                            typeSpeed={40}
                            deleteSpeed={1}
                            delaySpeed={2000}
                        />
                    </span>
                </div>
                <div className="malioboro" style={{ backgroundImage: `url(${malioboro})` }}></div>
            </div>
            <BackToMapButton />
            <InteractionCarouselButton openCarousel={() => setIsModalOpen(true)} />
            {isModalOpen && <>
                <InteractionCarousel closeCarousel={() => setIsModalOpen(false)} dataSet={MalioboroDataSet} />
            </>}
        </>
    )
}