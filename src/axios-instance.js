import axios from 'axios'

const instance = axios.create({
  //para testear ambiente de deploy: https://mlcorp.pythonanywhere.com/, para testear py local: http://localhost:5000
  baseURL: 'https://mlcorp.pythonanywhere.com/',
  timeout: 10000,
  withCredentials: true
})

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401 && window.location.pathname !== '/catalogo-forms/') {
      window.dispatchEvent(new Event('unauthorized'));
      setTimeout(() => window.location.href = '/catalogo-forms/', 2000);
    }
    return Promise.reject(error);
  }
);


export default instance