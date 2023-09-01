import axios from 'axios'

 const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
    'Content-Type': 'application/json',
  },
  });


//   axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');

//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => {

//     return response;
//   },
//   (error) => {
//     // Handle errors, e.g., check if the token is expired and refresh it
//     if (error.response.status === 401) {
//       // Handle token refresh or reauthentication here
//     }

//     return Promise.reject(error);
//   }
// );


  export default axiosInstance;