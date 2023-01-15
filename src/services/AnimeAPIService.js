import apiClient from './AxiosClient.js'

export default {
  getAnime(id) {
    return apiClient.get('/anime/' + id)
  },
  getAnimes(page) {
    return apiClient.get('/top/anime?page=' + page)
  }
}
