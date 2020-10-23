import axios from "axios";
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

const defaultConfig = (accessToken, cancel = false) => {
    let config = {
        headers: {
            Authorization: 'Bearer ' + accessToken,
        }
    }
    if (cancel) {
        config.cancelToken = cancel;
    }
    return config;
}

const { get, post, put, patch, delete: destroy} = apiClient;
export { get, post, put, patch, destroy, defaultConfig };