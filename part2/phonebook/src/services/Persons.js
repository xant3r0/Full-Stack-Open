import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = () => {
    return axios.get(baseUrl).then(res => res.data)
}

const addPersonToDb = (userObj) => {
    return axios.post(baseUrl,userObj).then(res => res.data)
}

const deleteUserFromDb = (userId) => {
    return axios.delete(`${baseUrl}/${userId}`).then(res => res.data)
}

const replaceOldNumber = (userId,userObj) => {
    return axios.put(`${baseUrl}/${userId}`,userObj).then(res => res.data)
}

export default {getAllPersons,addPersonToDb,deleteUserFromDb,replaceOldNumber}

