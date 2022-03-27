import JwtService from './jwt.service'
import _ from 'lodash'
import axios from 'axios'

const ApiService = {
  init() {
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  },

  setHeader() {
    axios.defaults.headers.common['Authorization'] = `${JwtService.getToken()}`
    //console.log('token:', axios.defaults.headers.common['Authorization'])
  },
  query(resource, params) {
    if (JwtService.getToken() !== null) {
      this.setHeader()
    }
    return axios({
      method: 'post',
      url: `${resource}`,
      baseURL: axios.defaults.baseURL,
      data: params,
    }).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  },

  get(resource, slug = '') {
    if (JwtService.getToken() !== null) {
      this.setHeader()
    }
    let params = ''
    if (!_.isNaN(slug)) {
      params = '?' + slug
    }
    if (_.isObject(slug)) {
      params =
        '?' +
        _.keys(slug)
          .filter((key) => slug[key] != null && slug[key] !== 'null')
          .map((key) => key + '=' + slug[key])
          .join('&')
    }

    //return Vue.axios.get(`${resource}${params}`) ;

    return axios({
      method: 'get',
      url: `${resource}`,
      baseURL: axios.defaults.baseURL,
      data: params,
    })
    // return Vue.axios.get(`${resource}`) ;
    // De CALL nhan duoc thi tat
    // .catch(error => {
    //     throw new Error(`[RWV] ApiService ${error}`);
    // });
  },

  post(resource, params) {
    if (JwtService.getToken() !== null) {
      this.setHeader()
    }
    //return Vue.axios.post(`${resource}`, params);
    return axios({
      method: 'post',
      url: `${resource}`,
      baseURL: axios.defaults.baseURL,
      data: params,
    })
  },

  update(resource, slug, params) {
    // return Vue.axios.put(`${resource}/${slug}`, params);
    if (JwtService.getToken() !== null) {
      this.setHeader()
    }
    return axios({
      method: 'update',
      url: `${resource}/${slug}`,
      baseURL: axios.defaults.baseURL,
      data: params,
    })
  },

  put(resource, params) {
    if (JwtService.getToken() !== null) {
      this.setHeader()
    }
    //return Vue.axios.put(`${resource}`, params);
    return axios({
      method: 'put',
      url: `${resource}`,
      baseURL: axios.defaults.baseURL,
      data: params,
    })
  },
  patch(resource, params) {
    if (JwtService.getToken() !== null) {
      this.setHeader()
    }
    //return Vue.axios.patch(`${resource}`, params);
    return axios({
      method: 'patch',
      url: `${resource}`,
      baseURL: axios.defaults.baseURL,
      data: params,
    })
  },

  delete(resource) {
    if (JwtService.getToken() !== null) {
      this.setHeader()
    }
    return axios({
      method: 'delete',
      url: `${resource}`,
      baseURL: axios.defaults.baseURL,
    }).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  },
  download(resource, params) {
    if (JwtService.getToken() !== null) {
      this.setHeader()
    }
    // `responseType` indicates the type of data that the server will respond with
    // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
    //   browser only: 'blob'

    return axios({
      url: `${resource}`, //your url
      baseURL: axios.defaults.baseURL,
      params: params,
      method: 'GET',
      responseType: params.responseType ? params.responseType : 'blob', // important
    }).then((response) => {
      if (!response.headers['content-type'].includes('application/json')) {
        // var filename =response.headers["content-disposition"] ;
        //filename = filename.substring(filename.search("filename=")+9);
        var filename = params.filename //'Report-file.xlsx';
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename) //or any other extension
        document.body.appendChild(link)
        link.click()
      }
      return response
    })
  },
}

export default ApiService
