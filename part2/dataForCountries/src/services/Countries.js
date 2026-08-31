import axios from "axios";
const url = `https://studies.cs.helsinki.fi/restcountries/api/all`

const getCountries = () => {
    return axios
        .get(url)
        .then(res => res.data)
}

export default {getCountries}