import axios from 'axios'


const axiosClient = axios.create({ baseURL: import.meta.env.VITE_URL_API})


/**
 * Get user token from LocalStorage
 * @type {string}
 */
const token = localStorage.getItem('token')


/**
 *Register User token Authtorization for all http requets NOT USED
 * @type  {string}
 */
if( token ) axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token} `;


axiosClient.defaults.headers.common['Accept'] = 'application/json';


export default axiosClient;