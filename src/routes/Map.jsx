import { useState, useEffect } from 'react'
import WeatherAPI, {getWeather} from '../components/WeatherAPI/ApiS/WeatherAPI'
import yogyamap from '../assets/peta-jogja.png'
import AOS from 'aos'
import candi from '../assets/prambanan.png'
import pantai from '../assets/pantai-parangtritis.png'
import goa from '../assets/goa-pindul.png'
import pinLogo from '../assets/pin-location.png'
import hehasky from '../assets/heha-sky-view.png'
import malioboro from '../assets/maliboro.png'
import EnergyBar from "../components/UserStatus/EnergyBar";
import HappinessBar from "../components/UserStatus/HappinessBar";
import Balance from '../components/UserStatus/Balance'
import BackToMainButton from '../components/Buttons/BackToMainButton';
import MemoryGame from '../components/Modals/MemoryGame/MemoryGame';
import MemoryGameButton from '../components/Buttons/MemoryGameButton';
import QuizButton from '../components/Buttons/QuizButton'
import HotelCarouselButton from '../components/Buttons/HotelCarouselButton'
import LoadingModal from '../components/Modals/Quiz/LoadingModal'
import Quiz from '../components/QuizAPI/Quiz';
import HotelCarousel from '../components/Carousel/HotelCarousel'
import hotelDataSet from '../components/Carousel/HotelData'
import PinPrompt from '../components/Modals/Pins/PinPrompt'
import "../components/QuizAPI/Quiz.css";
import './Map.css'
import 'aos/dist/aos.css'

function QuizAPI({ closeQuiz }) {
    const [allQuestions, setAllQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);

    useEffect(() => {
        getQuestions();
    }, []);

    const getQuestions = async () => {
        try {
            const response = await fetch("https://6634b6ea9bb0df2359a27bc0.mockapi.io/questions");
            const qstnResp = await response.json();
            // console.log(qstnResp);
            setAllQuestions(qstnResp);

            const randomIndexes = [];
            while (randomIndexes.length < 5) {
                const randomIndex = Math.floor(Math.random() * qstnResp.length);
                if (!randomIndexes.includes(randomIndex)) {
                    randomIndexes.push(randomIndex);
                }
            }
            const selectedQ = randomIndexes.map(index => qstnResp[index]);
            setSelectedQuestions(selectedQ);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        selectedQuestions.length <= 0 ? <LoadingModal /> : <Quiz closeQuiz={closeQuiz} questions={selectedQuestions} />
    );
}

const pins = [
    { id: 1, dest: 'Candi Prambanan', target: '/candi-prambanan', biaya: 290000, img: candi },
    { id: 2, dest: 'Pantai Parangtritis', target: '/pantai-parangtritis', biaya: 192330, img: pantai },
    { id: 3, dest: 'Goa Pindul', target: '/goa-pindul', biaya: 390000, img: goa },
    { id: 4, dest: 'Heha Sky View', target: '/heha-sky-view', biaya: 280000, img: hehasky },
    { id: 5, dest: 'Malioboro', target: '/malioboro', biaya: 220000, img: malioboro },
];

/*
biaya:
-------------------
yia -> parangtritis
-------------------
bus -> taxi : 192,330 - 379,378
taxi : 200,000-250,000
drive : 71,437-103-187
towncar : 450,000 - 650,000

-------------------
yia -> candi prambanan
-------------------
bus : 53,500 - 73,500
taxi : 290,000 - 350,000
drive : 106,059 - 153,197

-------------------
yia -> jl malioboro
-------------------
bus : 50,000 - 200,000
taxi : 220,000 - 270,000
bus -> train : 97,330 - 459,378
drive : 77,579 - 112,058
towncar : 480,000 - 700,000
shuttle : 75,618

-------------------
yia -> heha sky view
-------------------
bus : 130,000 - 165,000
taxi : 280,000 - 340,000
drive : 103,412 - 149,373
bus -> train -> taxi : 177,330 - 559,378
towncar : 550,000 - 850,000

-------------------
yia -> goa pindul
-------------------
bus -> taxi : 230,000 - 300,000
taxi : 390,000 - 470,000
drive : 145,241 - 209,792
bus -> taxi : 237,125 - 434,380
bus -> train -> taxi : 282,330 - 679,378
*/

export default function Map() {
    const [isPrompting, setIsPrompting] = useState(Array(pins.length).fill(false));
    const [isMemoryGame, setMemoryGame] = useState(false);
    const [isQuiz, setQuiz] = useState(false);
    const [isHotelCarousel, setIsHotelCarousel] = useState(false);
    const [weather, setWeather] = useState({});

    useEffect(() => {
        const fetchWeather = () => {
            // console.log('Fetching weather data...');
            getWeather()
                .then(result => {
                    // console.log('Weather data fetched:', result);
                    setWeather(result);
                })
                .catch(error => {
                    console.error("Error fetching the weather data:", error);
                });
        };

        fetchWeather();

        const weatherInterval = setInterval(fetchWeather, 10000);

        return () => clearInterval(weatherInterval);
    }, []);
    
    const handlePromptToggle = (index) => {
        const newIsPrompting = [...isPrompting];
        newIsPrompting[index] = !newIsPrompting[index];
        setIsPrompting(newIsPrompting);
    };

    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <>
            <div className='map-bungkus' data-aos='zoom-out' data-aos-duration="1500">
                <div className="bars">
                    <EnergyBar maxEgy={100} />
                    <HappinessBar maxHap={100} />
                    <Balance />
                </div>
                <div className="map-background-container">
                    <div className="map-image-container m-auto">
                        <img className='map-image img-fluid' src={yogyamap} alt="Daerah Istimewa Yogyakarta" />
                        {weather === "Rainy"}
                        <div className="map-icons-container">
                            {pins.map((pin, index) => (
                                <div className="icons" key={pin.id}>
                                    <img className={`pin-${pin.id}`} src={pinLogo} alt={`${pin.dest}-pin`} onClick={() => handlePromptToggle(index)} />
                                    {isPrompting[index] && (
                                        <PinPrompt
                                            dest={pin.dest}
                                            target={pin.target}
                                            biaya={weather === "Rainy" ? pin.biaya * 2 : pin.biaya}
                                            closePrompt={() => handlePromptToggle(index)}
                                        />
                                    )}
                                    <div className={`tooltip-container-${pin.id}`}>
                                        <span className="pin-text">{pin.dest}</span>
                                        <img className="tooltip-image" src={pin.img} alt={pin.dest} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div >
                    <div className='map-buttons-container d-flex justify-content-between mt-4 mx-5'>
                        <BackToMainButton />
                        <MemoryGameButton openMemoryGame={() => setMemoryGame(!isMemoryGame)} biaya={90000} energi={20} />
                        {isMemoryGame && <MemoryGame closeMemoryGame={() => setMemoryGame(!isMemoryGame)} biaya={150000} energi={20} />}
                        <QuizButton openQuiz={() => setQuiz(!isQuiz)} energi={10} />
                        {isQuiz && <QuizAPI closeQuiz={() => setQuiz(!isQuiz)} energi={10} />}
                        <HotelCarouselButton openCarousel={() => setIsHotelCarousel(!isHotelCarousel)} />
                        {isHotelCarousel && <HotelCarousel closeCarousel={() => setIsHotelCarousel(!isHotelCarousel)} dataSet={hotelDataSet} />}
                    </div>
                </div>
            </div>
        </>
    )
}