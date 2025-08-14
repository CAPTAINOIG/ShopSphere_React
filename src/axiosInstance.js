import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'https://shopsphere-node.onrender.com',
    // baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
});
export default axiosInstance;

