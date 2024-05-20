import { useState, useContext } from "react"
import { RainyContext } from "../../../contexts/RainyContext";


export default function WeatherAPI() {
    const api = {
        key: "04d7d5f322c04bf3ea465133bc62e582",
        base: "https://api.openweathermap.org/data/2.5/"
    }

    function getWeather() {
        fetch(`${api.base}weather?q=Yogyakarta&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
            });
    };

    const decideWeatherColor = () => {
        if (weather.weather[0].main === "Clouds") {
            return "rgb(92, 92, 92)"
        }
        else if (weather.weather[0].main === "Rain") {
            return "rgb(2, 2, 255)"
        }
        else if (weather.weather[0].main === "Clear") {
            return "rgb(252, 244, 3)"
        }
    }

    const [weather, setWeather] = useState({});
    const { isRaining, setIsRaining } = useContext(RainyContext);


    if (weather.weather && weather.weather[0].main === "Rainy") {
        setIsRaining(true);
        // alert("Rain Takes More Energy!")
    }


    return (
        <div className="weather-container">
            <h1>Weatherrrrrr</h1>
            <button onClick={getWeather}>Get Yogya Weather</button>

            {typeof weather.main !== "undefined" ? (
                <div>
                    <h2>{weather.name}</h2>
                    <h4>{weather.main.temp}°</h4>
                    <h4 style={{ color: decideWeatherColor() }}>{weather.weather[0].main}</h4>
                </div>
            )
                :
                ""
            }
        </div>
    )
}

export function getWeather() {
    const api = {
        key: "04d7d5f322c04bf3ea465133bc62e582",
        base: "https://api.openweathermap.org/data/2.5/"
    };

    return fetch(`${api.base}weather?q=Yogyakarta&units=metric&APPID=${api.key}`)
        .then(res => res.json());
}