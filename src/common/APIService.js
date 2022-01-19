/* eslint-disable */
import axios from 'axios'

// Express là SERVER --> Nên Express & Frontend-Vue Cùng URL & Port
//const API_URL = 'https://nghiatv.herokuapp.com';   // npm run dev ONCLY   ||  UP HEROKU
//const API_URL = '';  // npm run build ---><npm run start> -->  Express-Vue   ||  UP HEROKU
const API_URL = axios.defaults.appURL

export class APIService {
  constructor() {
    // axios.defaults.baseURL = API_URL;
    //console.log(window.axios.defaults.baseURL)
  }
  putTodos(model, todo) {
    const url = `${API_URL}/api/${model}/`
    // console.log(todo);
    return axios.put(url, todo)
  }
  getTodos(model) {
    const url = `${API_URL}/api/${model}/`
    //console.log('Url: '+ url);
    return axios.get(url).then((response) => response.data)
  }

  getTodo(model, pk) {
    const url = `${API_URL}/api/${model}/${pk}`
    return axios.get(url).then((response) => response.data)
  }
  deleteTodo(model, pk) {
    const url = `${API_URL}/api/${model}/${pk}`
    return axios.delete(url)
  }

  createTodo(model, todo) {
    const url = `${API_URL}/api/${model}/`
    // console.log(todo);
    return axios.post(url, todo)
  }
  createQuery(model, todo) {
    const url = `${API_URL}/api/${model}/`
    // console.log(todo);
    return axios.post(url, todo)
  }

  updateTodo(model, pk, todo) {
    const url = `${API_URL}/api/${model}/${pk}`
    return axios.patch(url, todo)
  }
}
