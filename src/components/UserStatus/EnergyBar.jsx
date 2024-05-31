import React, { useState, useEffect, useContext } from "react";
import WeatherAPI, { getWeather } from "../WeatherAPI/ApiS/WeatherAPI";
import { EnergyContext } from "../../contexts/EnergyContext";
import { IntervalContext } from "../../contexts/IntervalContext";
import { RainyContext } from "../../contexts/RainyContext";
import RainyModal from "../Modals/Weather/RainyModal";
import EnergyModal from '../../components/Modals/Energy/EnergyModal'
import energy from '../../assets/game-energy.png'
import "./Bars.css";

export default function EnergyBar({ maxEgy }) {
    const [weather, setWeather] = useState({});
    const { isRaining, setIsRaining, showRainyModal, setShowRainyModal } = useContext(RainyContext);
    const [isDead, setIsDead] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const { currEgy, setCurrEgy } = useContext(EnergyContext);
    const { isIntervalActive, setIsIntervalActive } = useContext(IntervalContext);

    useEffect(() => {
        getWeather()
            .then(result => {
                setWeather(result);
            })
            .catch(error => {
            });
    }, []);

    useEffect(() => {
        if (isIntervalActive) {
            const decreaseEgy = () => {
                setCurrEgy(prevEgy => (prevEgy > 0 ? prevEgy - 1 : 0));
            };

            const intervalTime = (weather.weather && weather.weather[0].main === "Rain" ? 5000 : 10000);

            const fetchWeatherInterval = setInterval(() => {
                getWeather()
                    .then(result => {
                        setWeather(result);
                    })
                    .catch(error => {
                    });
            }, intervalTime);

            const energyInterval = setInterval(() => {
                decreaseEgy();
            }, intervalTime);

            return () => {
                clearInterval(fetchWeatherInterval);
                clearInterval(energyInterval);
            };
        }
    }, [isIntervalActive, weather]);


    const currEgyPercentage = (currEgy / maxEgy) * 100;

    useEffect(() => {
        if (currEgy === 0 && !isDead) {
            setIsDead(true);
            setShowAlert(true);
        }
        else if (currEgy > 0 && isDead) setIsDead(false);
    }, [currEgy, isDead]);

    const compEgyBarColor = () => {
        if (currEgyPercentage === 100) {
            return "rgb(0, 158, 61)";
        } else if (currEgyPercentage > 75) {
            return "rgb(78, 212, 34)";
        } else if (currEgyPercentage > 50) {
            return "rgb(168, 157, 0)";
        } else if (currEgyPercentage > 25) {
            return "rgb(168, 36, 0)";
        } else return "rgb(168, 17, 0)";
    };

    useEffect(() => {
        if (isIntervalActive) {
            const decreaseEgy = () => {
                setCurrEgy(prevEgy => (
                    prevEgy > 0 ? prevEgy - 1 : 0
                ));
            };
            const intervalTime = (weather.weather && weather.weather[0].main === "Rainy") ? 5000 : 10000;
            const intervalId = setInterval(decreaseEgy, intervalTime);
            return () => clearInterval(intervalId);
        }
    }, [isIntervalActive])

    return (
        <>
            <div>
                <div className="d-flex mt-2">
                    <div><img className="energy" src={energy} alt="" /></div>
                    <div className="energy-bar">
                        <div
                            className="energy-bar-bar"
                            style={{ width: `${currEgyPercentage}%`, background: `${compEgyBarColor()}` }}
                        >
                            <div className="energy-num">&nbsp;</div>
                        </div>
                    </div>
                </div>
                {showAlert && <EnergyModal showAlert={showAlert} setShowAlert={setShowAlert} setCurrEgy={setCurrEgy} />}
            </div>
            {isRaining && showRainyModal && <RainyModal />}
        </>
    );
}