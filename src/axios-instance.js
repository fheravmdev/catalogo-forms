import axios from 'axios'

const instance = axios.create({
  //para testear ambiente de deploy: https://mlcorp.pythonanywhere.com/, para testear py local: http://localhost:5000
  baseURL: 'https://mlcorp.pythonanywhere.com/', 
  timeout: 40000,
  withCredentials: true
})

export default instance