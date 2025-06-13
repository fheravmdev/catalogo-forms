import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://mlcorp.pythonanywhere.com/', //para deployear: https://mlcorp.pythonanywhere.com/, para local: http://localhost:5000
  timeout: 40000,
  withCredentials: true
})

export default instance