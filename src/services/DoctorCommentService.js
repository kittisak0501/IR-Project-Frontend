import apiClient from './AxiosClient.js'

export default {
  getDoctors() {
    return apiClient.get('/doctorcomments')
  },
  addDoctorComments(comments) {
    return apiClient.post('/doctorcomments', comments)
  }
}
