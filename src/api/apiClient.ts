import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_URL_API,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
})

export default axiosClient;