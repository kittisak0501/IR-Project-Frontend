import apiClient from './AxiosClient.js'

export default {
  getDoctors() {
    return apiClient.get('/doctors')
  },
  getDoctor(id) {
    return apiClient.get('/doctors/' + id)
  },
  getDoctorPatient(id) {
    return apiClient.get('/doctors/' + id + '/patients')
  }
}
