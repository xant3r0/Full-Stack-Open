import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = () => {
    return axios.get(baseUrl)
}

const addPersonToDb = (userObj) => {
    return axios.post(baseUrl,userObj)
}

export default {getAllPersons,addPersonToDb}

