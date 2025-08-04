import axios from "axios";

const httpClient = axios.create({
    baseURL: 'https://49.12.168.100:5001/api'
})

export default httpClient;