import axios from "axios";
import getCookie from "../tokens/DjangoCSRFToken";

const csrfToken = getCookie('csrftoken')
console.log('csrf Token = ', csrfToken)

const axiosInstance = axios.create({
    // baseURL:'http://127.0.0.1:8000',
    baseURL:'http://localhost:3000/',
    headers:{
        'Access-Control-Allow-Headers': 'X-Requested-With, privatekey',
        "Access-Control-Allow-Origin": "*",
        // 'X-CSRFToken':csrfToken
        // 'X-CSRFToken': '{{ csrf_token }}'
    }
})

export default axiosInstance
