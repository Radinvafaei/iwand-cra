import axios from "axios";

const httpClient = axios.create({
    baseURL: 'https://orchestrator.iwand.style'
})

export default httpClient;