import axios from 'axios';
import { LOCAL_CONFIG } from '../../config';

// const BASE_URL_IP = LOCAL_CONFIG.BASE_URL_IP;
const BASE_URL_IP = LOCAL_CONFIG.BASE_URL_IP_API

const myBackEndClient = axios.create({
    baseURL: BASE_URL_IP, 
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default myBackEndClient;