import React, { useContext, useEffect, useState } from "react";
import { getWeather } from "../WeatherAPI/ApiS/WeatherAPI";
import { HappinessContext } from "../../contexts/HappinessContext";
import { IntervalContext } from "../../contexts/IntervalContext";
import HappinessModal from "../Modals/Happiness/HappinessModal";
import happy from '../../assets/game-smile.png'
import "./Bars.css";

export default function HappinessBar({ maxHap }) {
    const [isBored, setisBored] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [weather, setWeather] = useState({});
    const { currHap, setCurrHap } = useContext(HappinessContext);
    const { isIntervalActive, setIsIntervalActive } = useContext(IntervalContext);

    getWeather()
        .then(result => {
            setWeather(result);
        })

    const currHapPercentage = (currHap / maxHap) * 100;

    useEffect(() => {
        if (currHap === 0 && !isBored) {
            setisBored(true);
            setShowAlert(true);
        }
        else if (currHap > 0 && isBored) setisBored(false);
        // console.log(isBored)
    }, [currHap, isBored]);

    const compHapBarColor = () => {
        if (currHapPercentage === 100) {
            return "rgb(0, 158, 61)";
        } else if (currHapPercentage > 75) {
            return "rgb(78, 212, 34)";
        } else if (currHapPercentage > 50) {
            return "rgb(168, 157, 0)";
        } else if (currHapPercentage > 25) {
            return "rgb(168, 36, 0)";
        } else return "rgb(168, 17, 0)";
    };

    const handleRemoveHappiness = () => {
        const newHap = currHap - 10;
        setCurrHap(newHap >= 0 ? newHap : 0);
    };

    const handleAddHappiness = () => {
        const newHap = currHap + 10;
        setCurrHap(newHap <= maxHap ? newHap : 100);
    };

    useEffect(() => {
        if (isIntervalActive) {
            const decreaseHapp = () => {
                setCurrHap(prevHapp => (prevHapp > 0 ? prevHapp - 1 : 0));
            };
            const intervalTime = (weather === "Rainy" ? 5000 : 10000);
            const intervalId = setInterval(decreaseHapp, intervalTime);
            return () => clearInterval(intervalId);
        }
    }, [isIntervalActive])

    return (
        <div>
            <div className="d-flex mt-2">
                <div><img className="happy" src={happy} alt="" /></div>
                <div className="happiness-bar">
                    <div
                        className="happiness-bar-bar"
                        style={{ width: `${currHapPercentage}%`, background: `${compHapBarColor()}` }}
                    >
                        {/* <div className="happiness-num">{Math.floor(currHapPercentage)}%</div> */}
                        <div className="happiness-num">&nbsp;</div>
                    </div>
                </div>
            </div>
            {/* <button onClick={handleRemoveHappiness}>Remove 10% Happiness</button>
            <button onClick={handleAddHappiness}>Add 10% Happiness</button> */}
            {showAlert && <HappinessModal setShowAlert={setShowAlert} setCurrHap={setCurrHap} />}
        </div>
    );
}
