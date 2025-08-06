import axios from "axios";

const httpClient = axios.create({
    baseURL: 'https://orchestrator.iwand.style/api'
})

export default httpClient;