import axios from 'axios'
const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const geocode = (capitalName) => {
    return axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${capitalName}&limit=1&appid=${apiKey}`).then(res => res.data)
}

export default {geocode}