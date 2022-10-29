<template>
  <div v-if="GStore.patient">
    <div class="nav justify-content-center">
      <router-link :to="{ name: 'PatientDetails' }">
        <font-awesome-icon icon="file-lines" /> DETAILS</router-link
      >

      <router-link :to="{ name: 'PatientVaccine' }"
        ><font-awesome-icon icon="syringe" /> VACCINATION STATUS</router-link
      >

      <router-link :to="{ name: 'DoctorComment' }"
        ><font-awesome-icon icon="message" /> DOCTOR'S COMMENT</router-link
      >
    </div>
    <h1>{{ GStore.patient.first_name }} {{ GStore.patient.last_name }}</h1>
    <router-view :patient="GStore.patient" />
  </div>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  inject: ['GStore'],
  components: { FontAwesomeIcon }
}
</script>

<style scoped>
.nav a {
  float: center;
  padding: 16px 14px;
  text-decoration: none;
  color: #2c3e50;
  font-weight: 700;
}
.nav a:hover {
  color: skyblue;
}

.nav a.router-link-exact-active {
  color: skyblue;
}
h1 {
  font-weight: 400;
}
</style>
