import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = () => {
    const res = axios.get(baseUrl)
    return res.then(res => res.data)
}

const addPersonToDb = (userObj) => {
    return axios.post(baseUrl,userObj).then(res => res.data)
}

const deleteUserFromDb = (userId) => {
    return axios.delete(`${baseUrl}/${userId}`).then(res => res.data)
}

export default {getAllPersons,addPersonToDb,deleteUserFromDb}

