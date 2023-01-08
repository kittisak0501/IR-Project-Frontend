<template>
  <h2 style="font-weight: 700">Patients:</h2>
  <div class="patients">
    <PatientCard
      v-for="patient in doctorPatient"
      :key="patient.id"
      :patient="patient"
    ></PatientCard>
  </div>
</template>

<script>
// @ is an alias to /src
import AuthService from '@/services/AuthService.js'
import PatientCard from '@/components/GenreCard.vue'
import DoctorService from '@/services/DoctorService.js'
import GStore from '@/store'
// import { watchEffect } from '@vue/runtime-core'
export default {
  inject: ['GStore'],
  name: 'DoctorPatientList',
  components: {
    PatientCard
  },
  data() {
    return {
      doctorPatient: null
    }
  },
  /* eslint-disable-next-line no-unused-vars */
  beforeRouteEnter(routeTo, routeFrom, next) {
    DoctorService.getDoctorPatient(GStore.currentUser.id)
      .then((response) => {
        next((comp) => {
          comp.doctorPatient = response.data
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    DoctorService.getDoctorPatient(GStore.currentUser.id)
      .then((response) => {
        this.doctorPatient = response.data
        next()
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  computed: {
    isAdmin() {
      return AuthService.hasRoles('ROLE_ADMIN')
    }
  }
}
</script>
<style scoped>
h2 {
  text-align: left;
  margin-top: 30px;
  padding-left: 300px;
}
.patients {
  display: flex;
  flex-direction: column;
  align-items: left;
  padding-left: 300px;
  padding-right: 250px;
}
.pagination {
  display: flex;
  width: 100%;
  padding-right: 30px;
  margin-bottom: 20px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #3c3e50;
}

#page-prev {
  text-align: left;
}
#page-prev:hover {
  color: skyblue;
}
#page-next {
  text-align: right;
}
#page-next:hover {
  color: skyblue;
}
</style>
