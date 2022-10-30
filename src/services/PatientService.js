import apiClient from './AxiosClient.js'

export default {
  getPatients(perPage, page) {
    return apiClient.get('/patients?_limit=' + perPage + '&_page=' + page)
  },
  getPatient(id) {
    return apiClient.get('/patients/' + id)
  },
  addDoctorComments(comments) {
    return apiClient.post('/doctorcomments', comments)
  },
  savePatient(patient) {
    return apiClient.post('/patients', patient)
  },
  uploadFile(file) {
    let formData = new FormData()
    formData.append('file', file)
    return apiClient.post('/uploadFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
