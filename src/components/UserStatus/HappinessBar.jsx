import React, { useContext, useEffect, useState } from "react";
import { getWeather } from "../WeatherAPI/ApiS/WeatherAPI";
import { HappinessContext } from "../../contexts/HappinessContext";
import { IntervalContext } from "../../contexts/IntervalContext";
import HappinessModal from "../Modals/Happiness/HappinessModal";
import happy from '../../assets/game-smile.png';
import "./Bars.css";

export default function HappinessBar({ maxHap }) {
    const [isBored, setIsBored] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [weather, setWeather] = useState({});
    const { currHap, setCurrHap } = useContext(HappinessContext);
    const { isIntervalActive, setIsIntervalActive } = useContext(IntervalContext);

    useEffect(() => {
        // console.log('Fetching weather data initially...');
        getWeather()
            .then(result => {
                // console.log('Initial weather data fetched:', result);
                setWeather(result);
            })
            .catch(error => {
                // console.error("Error fetching the weather data:", error);
            });
    }, []);

    useEffect(() => {
        if (isIntervalActive) {
            // console.log('Interval is active');
            const decreaseHapp = () => {
                setCurrHap(prevHapp => (prevHapp > 0 ? prevHapp - 1 : 0));
            };

            const intervalTime = (weather.weather && weather.weather[0].main === "Rain" ? 5000 : 10000);
            // console.log('Setting interval with time:', intervalTime);

            const fetchWeatherInterval = setInterval(() => {
                // console.log('Fetching weather data at interval...');
                getWeather()
                    .then(result => {
                        // console.log('Weather data fetched at interval:', result);
                        setWeather(result);
                    })
                    .catch(error => {
                        // console.error("Error fetching the weather data:", error);
                    });
            }, intervalTime);

            const happinessInterval = setInterval(() => {
                // console.log('Interval executed. Decreasing happiness.');
                decreaseHapp();
            }, intervalTime);

            return () => {
                // console.log('Clearing intervals');
                clearInterval(fetchWeatherInterval);
                clearInterval(happinessInterval);
            };
        }
    }, [isIntervalActive, weather]);

    useEffect(() => {
        if (currHap === 0 && !isBored) {
            setIsBored(true);
            setShowAlert(true);
        } else if (currHap > 0 && isBored) {
            setIsBored(false);
        }
    }, [currHap, isBored]);

    const currHapPercentage = (currHap / maxHap) * 100;

    const compHapBarColor = () => {
        if (currHapPercentage === 100) {
            return "rgb(0, 158, 61)";
        } else if (currHapPercentage > 75) {
            return "rgb(78, 212, 34)";
        } else if (currHapPercentage > 50) {
            return "rgb(168, 157, 0)";
        } else if (currHapPercentage > 25) {
            return "rgb(168, 36, 0)";
        } else {
            return "rgb(168, 17, 0)";
        }
    };

    return (
        <div>
            <div className="d-flex mt-2">
                <div><img className="happy" src={happy} alt="" /></div>
                <div className="happiness-bar">
                    <div
                        className="happiness-bar-bar"
                        style={{ width: `${currHapPercentage}%`, background: `${compHapBarColor()}` }}
                    >
                        <div className="happiness-num">&nbsp;</div>
                    </div>
                </div>
            </div>
            {showAlert && <HappinessModal setShowAlert={setShowAlert} setCurrHap={setCurrHap} />}
        </div>
    );
}
