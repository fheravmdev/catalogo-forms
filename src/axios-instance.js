import axios from 'axios'

const instance = axios.create({
  //para testear ambiente de deploy: https://mlcorp.pythonanywhere.com/, para testear py local: http://localhost:5000
  baseURL: 'http://localhost:5000', 
  timeout: 40000,
  withCredentials: true
})

export default instance