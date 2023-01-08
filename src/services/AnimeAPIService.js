import apiClient from './AxiosClient.js'

export default {
  getAnimeGenres() {
    return apiClient.get('/genres/anime')
  },
  getAnimes(page) {
    return apiClient.get('/anime?page=' + page)
  }
}