import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'https://guate-trivia.vercel.app/api'

const gtApi = axios.create({
    baseURL
})

export default gtApi
