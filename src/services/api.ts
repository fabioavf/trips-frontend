import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.120:4500',
});

export default api;
