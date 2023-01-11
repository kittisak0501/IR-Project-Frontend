import apiClient from './AxiosClient.js'

export default {
  searchAnimeByContent(page, q) {
    return apiClient.get('/anime?sfw=true&page=' + page + '&q=' + q)
  },
  getAnimes(page) {
    return apiClient.get('/top/anime?page=' + page)
  }
}
