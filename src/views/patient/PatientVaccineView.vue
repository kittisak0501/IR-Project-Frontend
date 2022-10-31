<template>
  <div class="block">
    <div id="block">
      <h3>First Dose:</h3>
      <p>brand: {{ patient.vaccine_brand1 }}</p>
      <p>date: {{ patient.vaccine_date1 }}</p>
    </div>
    <div id="block" v-if="patient.vaccine_brand2">
      <h3>Second Dose:</h3>
      <p>brand: {{ patient.vaccine_brand2 }}</p>
      <p>date: {{ patient.vaccine_date2 }}</p>
    </div>
  </div>
  <div class="block" v-if="isAdmin">
    <form id="container" @submit.prevent="onSubmit">
      <h3>Edit Vaccine Status:</h3>
      <label for="doses">Vaccination Status:</label>
      <select name="Vaccine_dose" v-model="patients.vaccine_stat">
        <option value="First Dose">First Dose</option>
        <option value="Second Dose">Second Dose</option>
      </select>
      <label for="brand">First Dose:</label>
      <select name="Vaccine_brand1" v-model="patients.vaccine_brand1">
        <option value="Sinovac">Sinovac</option>
        <option value="AstraZeneca">AstraZeneca</option>
        <option value="Pfizer">Pfizer</option>
        <option value="Johnson&Johnson">Johnson&Johnson</option>
      </select>

      <BaseInput v-model="patients.vaccine_date1" type="text" label="Date:" />

      <label for="brand">Second Dose:</label>
      <select name="Vaccine_brand2" v-model="patients.vaccine_brand2">
        <option value="Sinovac">Sinovac</option>
        <option value="AstraZeneca">AstraZeneca</option>
        <option value="Pfizer">Pfizer</option>
        <option value="Johnson&Johnson">Johnson&Johnson</option>
      </select>

      <BaseInput v-model="patients.vaccine_date2" type="text" label="Date:" />
      <p></p>
      <button
        type="submit"
        style="border-radius: 5px; width: 50%; margin-top: 20px"
      >
        Edit
      </button>
    </form>
  </div>
  <br />
  <br />
</template>

<script>
import BaseInput from '@/components/BaseInput.vue'
import AuthService from '@/services/AuthService.js'
export default {
  props: ['id', 'patient'],
  inject: ['GStore'],
  components: {
    BaseInput
  },
  data() {
    return {
      patients: {
        vaccine_stat: '',
        vaccine_brand1: '',
        vaccine_date1: '',
        vaccine_brand2: '',
        vaccine_date2: ''
      }
    }
  },
  methods: {
    onSubmit() {}
  },
  computed: {
    isAdmin() {
      return AuthService.hasRoles('ROLE_ADMIN')
    }
  }
}
</script>
<style scoped>
#block {
  display: inline-block;
  padding-left: 16px;
  padding-right: 16px;
}
.block {
  border: 1px solid #000;
  border-radius: 5px;
  align-items: center;
  padding-top: 10px;
  margin-top: 30px;
  margin-left: 35%;
  margin-right: 35%;
}
h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-weight: 700;
}
label {
  font-weight: 300;
}
select {
  width: 50%;
}
#container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
}
</style>
