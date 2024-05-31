import { useState, useContext, useEffect } from "react";
import { RainyContext } from "../../../contexts/RainyContext";

export function getWeather() {
    const api = {
        key: "04d7d5f322c04bf3ea465133bc62e582",
        base: "https://api.openweathermap.org/data/2.5/"
    };

    // console.log("Fetching weather data...");

    return fetch(`${api.base}weather?q=Yogyakarta&units=metric&APPID=${api.key}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok ' + res.statusText);
            }
            return res.json();
        })
        .then(data => {
            // console.log("Fetched weather data:", data);
            return data;
        })
        .catch(error => {
            console.error("Error fetching the weather data:", error);
        });
}


export default function WeatherAPI() {
    const [weather, setWeather] = useState({});
    const { isRaining, setIsRaining } = useContext(RainyContext);

    const api = {
        key: "04d7d5f322c04bf3ea465133bc62e582",
        base: "https://api.openweathermap.org/data/2.5/"
    };


    const getWeather = () => {
        fetch(`${api.base}weather?q=Yogyakarta&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
                if (result.weather && result.weather[0].main === "Rain") {
                    setIsRaining(true);
                } else {
                    setIsRaining(false);
                }
            })
            .catch(error => {
                console.error("Error fetching the weather data:", error);
            });
    };

    useEffect(() => {
        getWeather();
        const interval = setInterval(getWeather, 10000);
        return () => clearInterval(interval);
    });

    const decideWeatherColor = () => {
        if (!weather.weather) return "black";
        if (weather.weather[0].main === "Clouds") {
            return "rgb(92, 92, 92)";
        } else if (weather.weather[0].main === "Rain") {
            return "rgb(2, 2, 255)";
        } else if (weather.weather[0].main === "Clear") {
            return "rgb(252, 244, 3)";
        }
    };

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
            ) : (
                ""
            )}
        </div>
    );
}
