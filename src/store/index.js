import { reactive } from 'vue'
export default reactive({
  flashMessage: '',
  patient: null,
  doctors: null,
  doctorcomments: null,
  user: null,
  currentUser: JSON.parse(localStorage.getItem('user')),
  bookmark: []
})
