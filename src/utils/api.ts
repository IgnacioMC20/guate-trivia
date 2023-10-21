
import axios from 'axios'

const gtApi = axios.create({
    baseURL: '/api'
})

export default gtApi