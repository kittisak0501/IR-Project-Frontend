import { createRouter, createWebHistory } from 'vue-router'
import AnimeListView from '../views/AnimeListView.vue'
import PatientListView from '../views/PatientListView.vue'
import PatientLayoutView from '@/views/patient/PatientLayoutView.vue'
import PatientDetailView from '@/views/patient/PatientDetailsView.vue'
import PatientVaccineView from '@/views/patient/PatientVaccineView.vue'
import DoctorCommentView from '@/views/patient/DoctorCommentView.vue'
import PatientService from '@/services/PatientService'
import GStore from '@/store'
import NProgress from 'nprogress'
import NetWorkErrorView from '@/views/NetworkErrorView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import Login from '@/views/LoginFormView.vue'
import AddPatient from '@/views/PatientForm.vue'
import DoctorService from '@/services/DoctorService.js'
import Register from '@/views/RegisterFormView.vue'
import DoctorPatientList from '@/views/DoctorPatientListView.vue'
//import DoctorCommentService from '@/services/DoctorCommentService'

const routes = [
  {
    path: '/',
    name: 'AnimeList',
    component: AnimeListView,
    props: (route) => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/patient',
    name: 'PatientList',
    component: PatientListView
  },
  {
    path: '/patient/:id',
    name: 'PatientLayout',
    component: PatientLayoutView,
    props: true,
    beforeEnter: (to) => {
      return PatientService.getPatient(to.params.id)
        .then((response) => {
          GStore.patient = response.data
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            return {
              name: '404Resource',
              params: { resource: 'patient' }
            }
          } else {
            return { name: 'NetworkError' }
          }
        })
    },
    children: [
      {
        path: '',
        name: 'PatientDetails',
        component: PatientDetailView,
        props: true
      },
      {
        path: 'vaccine',
        name: 'PatientVaccine',
        props: true,
        component: PatientVaccineView
      },
      {
        path: 'doctorcomments',
        name: 'DoctorComment',
        props: true,
        component: DoctorCommentView
        // beforeEnter: (to) => {
        //   return DoctorCommentService.getDoctors(to.params.id)
        //     .then((response) => {
        //       GStore.doctorcomments = response.data
        //     })
        //     .catch(() => {
        //       GStore.doctorcomments = null
        //       console.log('cannot load doctor comments')
        //     })
        // }
      }
    ]
  },
  {
    path: '/doctorsPatient',
    name: 'DoctorPatientList',
    component: DoctorPatientList,
    beforeEnter: () => {
      return DoctorService.getDoctors()
        .then((response) => {
          console.log(GStore.doctors)
          GStore.doctors = response.data
        })
        .catch(() => {
          GStore.doctors = null
          console.log('cannot load doctor')
        })
    }
  },
  {
    path: '/add-patient',
    name: 'AddPatient',
    component: AddPatient,
    beforeEnter: (to) => {
      return DoctorService.getDoctors(to.params.id)
        .then((response) => {
          GStore.doctors = response.data
        })
        .catch(() => {
          GStore.doctors = null
          console.log('cannot load doctor list')
        })
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFoundView,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundView
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetWorkErrorView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
router.beforeEach(() => {
  NProgress.start()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
