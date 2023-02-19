import axios from "axios";

const axiosInstance = axios.create({
    baseURL:'http://127.0.0.1:8000',
    headers:{
        'Access-Control-Allow-Headers': 'X-Requested-With, privatekey',
        "Access-Control-Allow-Origin": "*"
    }
})

export default axiosInstance
