import axios from "axios";
const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const getWeather = (lat,lon) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`).then(res => res.data)
}

export default {getWeather}