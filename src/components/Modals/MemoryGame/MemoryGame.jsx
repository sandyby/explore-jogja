import ReactDom from 'react-dom'
import { useState, useEffect, useContext } from 'react'
import useSound from 'use-sound'
import MemoryGameCard from '../../Cards/MemoryGameCard'
import backCard from '../../../assets/back-card.png'
import andong from '../../../assets/memory-game-assets/andong.jpg'
import bakpia from '../../../assets/memory-game-assets/bakpia.png'
import brahma from '../../../assets/memory-game-assets/brahma.jpg'
import candiBrahma from '../../../assets/memory-game-assets/candi-brahma.jpg'
import candiUtama from '../../../assets/memory-game-assets/candi-utama.jpg'
import candiWisnu from '../../../assets/memory-game-assets/candi-wisnu.jpg'
import durga from '../../../assets/memory-game-assets/durga.jpg'
import ganesha from '../../../assets/memory-game-assets/ganesha.jpg'
import gudeg1 from '../../../assets/memory-game-assets/gudeg-1.PNG'
import gudeg2 from '../../../assets/memory-game-assets/gudeg-2.png'
import kueApem from '../../../assets/memory-game-assets/kue-apem.jpg'
import malioboro1 from '../../../assets/memory-game-assets/malioboro-1.jpg'
import nasgorMunggur from '../../../assets/memory-game-assets/nasi-goreng-munggur-minang.png'
import osengMercon from '../../../assets/memory-game-assets/oseng-mercon.png'
import pasarMalioboro from '../../../assets/memory-game-assets/pasar-malioboro.jpg'
import prambanan1 from '../../../assets/memory-game-assets/prambanan-1.png'
import sambelGorengKrecek from '../../../assets/memory-game-assets/sambel-goreng-krecek.png'
import sateKlathak from '../../../assets/memory-game-assets/sate-klathak.png'
import sendratari from '../../../assets/memory-game-assets/sendratari-ramayana-prambanan.jpg'
import tiwul from '../../../assets/memory-game-assets/tiwul.jpg'
import tugu from '../../../assets/memory-game-assets/tugu.jpg'
import wisnu from '../../../assets/memory-game-assets/wisnu.jpg'
import mieAyamKamehame from '../../../assets/memory-game-assets/mie-ayam-kamehame.png'
import patrem from '../../../assets/memory-game-assets/patrem.jpg'
import flip2 from '../../../assets/memory-game-assets/audio/flip2.mp3'
import AOS from 'aos';
import 'aos/dist/aos.css';
import './MemoryGame.css'
import { BalanceContext } from '../../../contexts/BalanceContext'
import { IntervalContext } from '../../../contexts/IntervalContext'
import { HappinessContext } from '../../../contexts/HappinessContext'
import { EnergyContext } from '../../../contexts/EnergyContext'

const imageMap = {
    andong,
    bakpia,
    brahma,
    candiBrahma,
    candiUtama,
    candiWisnu,
    durga,
    ganesha,
    gudeg1,
    gudeg2,
    kueApem,
    malioboro1,
    nasgorMunggur,
    osengMercon,
    pasarMalioboro,
    prambanan1,
    sambelGorengKrecek,
    sateKlathak,
    sendratari,
    tiwul,
    tugu,
    wisnu,
    mieAyamKamehame,
    patrem
};

function MemoryGame({ closeMemoryGame, isMemoryGame, biaya }) {
    let balance = 0;
    const [multiplier, setMultiplier] = useState(0);
    const [isStart, setStart] = useState(false);
    const [cards, setCards] = useState([]);
    const [totalMatches, setTotalMatches] = useState(0);
    const [totalTurns, setTotalTurns] = useState(0);
    const [isDisabled, setDisabled] = useState(false);
    const [isFinished, setFinished] = useState(false);
    const [choiceNum1, setChoiceNum1] = useState(null);
    const [choiceNum2, setChoiceNum2] = useState(null);
    const [playSound] = useSound(flip2, { volume: 0.02 });
    const [balanceGet, setBalanceGet] = useState(0);
    const [isBalanceEnough, setIsBalanceEnough] = useState(true);
    const [isEnergyEnough, setIsEnergyEnough] = useState(true);
    const { currMoney, setCurrMoney } = useContext(BalanceContext);
    const { isIntervalActive, setIsIntervalActive } = useContext(IntervalContext);
    const { currHap, setCurrHap } = useContext(HappinessContext);
    const { currEgy, setCurrEgy } = useContext(EnergyContext);
    const [allImages, setAllImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        getImages();
    }, []);

    const getImages = async () => {
        try {
            const response = await fetch("https://6634b6ea9bb0df2359a27bc0.mockapi.io/MemoryGame");
            const imgResp = await response.json();
            setAllImages(imgResp);

            const randomIndexes = [];
            while (randomIndexes.length < 6) {
                const randomIndex = Math.floor(Math.random() * imgResp.length);
                if (!randomIndexes.includes(randomIndex)) {
                    randomIndexes.push(randomIndex);
                }
            }
            const selectedImg = randomIndexes.map(index => {
                const imgObj = imgResp[index];
                return {
                    ...imgObj,
                    src: imageMap[imgObj.src]
                };
            });
            setSelectedImages(selectedImg);
        } catch (error) {
            console.log(error);
        }
    }

    console.log(selectedImages);

    const shuffleCards = () => {
        const shuffledCards = [...selectedImages, ...selectedImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }));
        setCards(shuffledCards);
        setChoiceNum1(null);
        setChoiceNum2(null);
        setTotalMatches(0);
        setTotalTurns(0);
    }

    const choiceHandler = (card) => {
        if (isDisabled || (choiceNum1 && choiceNum1.id === card.id)) {
            return;
        }

        choiceNum1 ? setChoiceNum2(card) : setChoiceNum1(card);
        // console.log(choiceNum1);
        // console.log(choiceNum2);
    }

    useEffect(() => {
        if (choiceNum1 && choiceNum2) {
            setDisabled(true);
            if (choiceNum1.src === choiceNum2.src) {
                // console.log("matches!");
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceNum1.src) {
                            return { ...card, matched: true };
                        } else {
                            return card;
                        }
                    });
                });
                resetChoice();
                setTotalMatches(prevTotalMatches => prevTotalMatches + 1);
            } else {
                setTimeout(() => {
                    resetChoice();
                }, 1000);
            }
        }
    }, [choiceNum1, choiceNum2]);

    const resetChoice = () => {
        setChoiceNum1(null);
        setChoiceNum2(null);
        setTotalTurns(prevTotalTurns => prevTotalTurns + 1);
        setDisabled(false);
    }

    const flipHandler = (card) => {
        if (card === choiceNum1 || card === choiceNum2 || card.matched) {
            playSound();
            return true;
        } else if (totalMatches === 6) {
            return true;
        }
    }

    useEffect(() => {
        // console.log(totalTurns);
        if (totalTurns === 6) {
            setMultiplier(3.5);
        } else if (totalTurns <= 10) {
            setMultiplier(2);
        } else if (totalTurns <= 14) {
            setMultiplier(1);
        } else if (totalTurns <= 20) {
            setMultiplier(0.5);
        } else if (totalTurns <= 28) {
            setMultiplier(0.25);
        } else {
            setMultiplier(0);
        }
        // console.log(multiplier);
    }, [totalTurns])

    const selesaiHandler = () => {
        const calculatedBalance = 200000 + (200000 * parseFloat(multiplier));
        setBalanceGet(calculatedBalance);
        setCurrMoney(prevCurrMoney => prevCurrMoney + calculatedBalance);
        const happinessGet = 15;
        setCurrHap(prevHap => (prevHap + happinessGet > 100) ? 100 : (prevHap + happinessGet));
    };

    useEffect(() => {
        if (totalMatches === 6) {
            setTimeout(() => {
                selesaiHandler();
                setTotalTurns(0);
                setTotalMatches(0);
                setFinished(true);
            }, 1500);
        }
    }, [totalMatches]);

    useEffect(() => {
        if (isFinished) {
            setStart(false);
            setIsIntervalActive(true);
        }
    }, [isFinished]);

    const playHandler = () => {
        setCurrMoney(prevMoney => prevMoney - biaya);
        setCurrEgy(prevEgy => prevEgy - 5);
        setIsIntervalActive(false);
    }

    const keluarHandler = () => {
        closeMemoryGame();
        setIsIntervalActive(true);
    }

    const mainLagiHandler = () => {
        setFinished(false);
        playHandler();
        shuffleCards();
    }

    useEffect(() => {
        if (currEgy < 5) {
            setIsEnergyEnough(false);
        }
        if (currMoney < biaya) {
            setIsBalanceEnough(false);
        }
    }, [currMoney, currEgy, biaya]);

    useEffect(() => {
        AOS.init();
    }, [])

    // console.log(cards);

    return ReactDom.createPortal(
        <>
            <div className="memory-game-modal-overlay" data-aos='zoom-out'>
                {!isFinished && <div className="memory-game-modal-container">
                    <div className="memory-game-modal-header">
                        <h3 data-aos='fade-down'>Memory Game</h3>
                        {/* <div className="temp-close-memory-game-modal-btn-container">
                            <button className='temp-close-memory-game-modal-btn btn btn-warning fs-3' data-aos='zoom-in-left' onClick={closeMemoryGame}>&times;</button>
                        </div> */}
                    </div>
                    {!isStart && !isFinished &&
                        <>
                            <div className="memory-game-modal-content" data-aos='fade-up'>
                                <p>Selamat datang di Memory Game! Akan disajikan beberapa kartu di depan Anda. Setiap kartu memiliki pasangannya. Tugas Anda adalah untuk mencari semua pasangan kartu dengan putaran sedikit mungkin. Semakin sedikit putaran, semakin banyak uang!</p>
                                <p>Ada beberapa ketentuan tentang jumlah putaran dan efek terhadap uang yang didapatkan</p>
                                {/* <p>Jika jumlah putaran:</p> */}
                                <p>Jika jumlah putaran = 6: x2.5</p>
                                <p>Jika jumlah putaran &#8804; 9: x2.0</p>
                                <p>Jika jumlah putaran &#8804; 14: x1.0</p>
                                <p>Jika jumlah putaran &#8804; 20: x0.5</p>
                                <p>Jika jumlah putaran &#8804; 28: x0.25</p>
                            </div>
                            <div className="memory-game-modal-footer">
                                <div className="memory-game-start-btn-container text-center">
                                    <button className="memory-game-start-btn-container btn" onClick={() => { shuffleCards(); setStart(!isStart) }}>Mulai Permainan!</button>
                                </div>
                            </div>
                        </>}

                    {isStart && !isFinished &&
                        <>
                            <div className="memory-game-content-header-container mb-4">
                                <div className="memory-game-retry-btn-container">
                                    <button className="memory-game-retry-btn-container border-0 rounded-2 p-2" onClick={() => {
                                        // setTimeout(() => {
                                        //     shuffleCards();
                                        // }, 1000)
                                        setTimeout(() => {
                                            setStart(false);
                                            setFinished(false);
                                        }, 1000)
                                        // setTimeout(() => {
                                        //     setStart(true);
                                        //     shuffleCards();
                                        // }, 2500)
                                    }}>Coba Ulang &#8634;</button>
                                </div>
                                <div className="total-turns-container">
                                    <h6 className='total-turns'>Jumlah Gerakan : {totalTurns}</h6>
                                </div>
                            </div>
                            <div className="memory-game-content-container">
                                <div className="card-grid">
                                    {cards.map(card => (
                                        <MemoryGameCard key={card.id} card={card} backCard={backCard} choiceHandler={choiceHandler} isFlipped={flipHandler(card)} isDisabled={isDisabled} />
                                    ))}
                                </div>
                            </div>
                        </>
                    }
                </div>}
                {isFinished &&
                    <>
                        <div className="finish-memory-game-container">
                            <div className="finish-memory-game-header-container">
                                <h4>Selamat! Kamu berhasil menang<br />dan mendapatkan uang sebanyak</h4>
                                <h3 style={{ margin: "10px auto", width: "fit-content" }}>🪙{balanceGet}</h3>
                            </div>
                            <div className="finish-memory-game-content">
                                <div className="keluar-memory-game-btn-container">
                                    <button className="keluar-memory-game-btn btn btn-danger" onClick={keluarHandler}>Keluar</button>
                                </div>
                                {isEnergyEnough && isBalanceEnough &&
                                    <div className="main-lagi-memory-game-btn-container">
                                        <button className="main-lagi-memory-game-btn btn btn-success" onClick={mainLagiHandler}>Main Lagi</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </>}
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default MemoryGame;