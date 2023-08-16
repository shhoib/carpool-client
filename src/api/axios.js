import axios from 'axios'

 const instance = axios.create({
    baseURL: 'http://localhost:5173'
  });

  export default instance;