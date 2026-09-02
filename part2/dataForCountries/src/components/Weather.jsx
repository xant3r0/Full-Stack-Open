import {useState, useEffect} from "react";
import WeatherService from "../services/Weather.js"
import GeocodingService from "../services/Geocoding.js";

const Weather = ({capital}) => {
    const [lat,setLat] = useState(0)
    const [lon,setLon] = useState(0)
    const [weather,setWeather] = useState(null)

    useEffect(() => {
        GeocodingService.geocode(capital).then((data) => {
            setLat(data[0].lat)
            setLon(data[0].lon)
        })
    }, [capital]);

    useEffect(() => {
        WeatherService.getWeather(lat,lon).then(data => setWeather(data))
     }, [lat,lon]);

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p>Temperature {Math.ceil(weather?.main.temp - 273.15)} °</p>
            <img src={`https://openweathermap.org/payload/api/media/file/${weather?.weather[0]?.icon}.png`} alt="Nigger"/>
            <p>Wind {weather?.wind.speed} m/s</p>
        </div>
    )
}

export default Weather