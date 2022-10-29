import apiClient from './AxiosClient.js'

export default {
  getDoctors() {
    return apiClient.get('/doctors')
  }
}
