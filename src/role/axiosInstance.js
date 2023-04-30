import axios from "axios";
import getCookie from "../tokens/DjangoCSRFToken";
import cors from 'cors'

const csrfToken = getCookie('csrftoken')
console.log('csrf Token = ', csrfToken)

const corsMiddleware = cors({
    origin: 'http://localhost:8000',  // replace with your Django API's domain
    credentials: true,
  });

const axiosInstance = axios.create({
    baseURL:'http://127.0.0.1:8000',
    // baseURL:'http://localhost:3000/',
    headers:{
        // 'X-CSRFToken':csrfToken
        // 'X-CSRFToken': '{{ csrf_token }}'
    },
    mode:'cors',
    credentials: 'include',
})

export default axiosInstance
