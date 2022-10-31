<template>
  <div class="PatientForm">
    <form @submit.prevent="addPatient">
      <div class="container">
        <h1 style="font-weight: 700">File a New Patient</h1>
        <h3>Patient's name & details:</h3>

        <label>Patient Image:</label>
        <UploadImages @changed="handleImages" :max="1" />
        <p></p>
        <BaseInput
          v-model="patient.first_name"
          type="text"
          label="First_name: "
        />

        <BaseInput
          v-model="patient.last_name"
          type="text"
          label="Last_name: "
        />

        <BaseInput v-model="patient.age" type="text" label="Age: " />

        <BaseInput v-model="patient.hometown" type="text" label="Hometown: " />
        <p></p>
      </div>

      <div class="container">
        <h3>Vaccine Status:</h3>
        <label for="doses">Vaccination Status:</label>
        <select name="Vaccine_dose" v-model="patient.vaccine_stat">
          <option value="First Dose">First Dose</option>
          <option value="Second Dose">Second Dose</option>
        </select>
        <p></p>
        <label for="brand">First Dose:</label>
        <select name="Vaccine_brand1" v-model="patient.vaccine_brand1">
          <option value="Sinovac">Sinovac</option>
          <option value="AstraZeneca">AstraZeneca</option>
          <option value="Pfizer">Pfizer</option>
          <option value="Johnson&Johnson">Johnson&Johnson</option>
        </select>

        <BaseInput v-model="patient.vaccine_date1" type="text" label="Date:" />

        <label for="brand">Second Dose:</label>
        <select name="Vaccine_brand2" v-model="patient.vaccine_brand2">
          <option value="Sinovac">Sinovac</option>
          <option value="AstraZeneca">AstraZeneca</option>
          <option value="Pfizer">Pfizer</option>
          <option value="Johnson&Johnson">Johnson&Johnson</option>
        </select>

        <BaseInput v-model="patient.vaccine_date2" type="text" label="Date:" />
        <p></p>
      </div>

      <div class="container">
        <h3>Set Doctor in Charge:</h3>
        <BaseSelect
          :options="GStore.doctors"
          v-model="patient.doctor.id"
          label="Select a Doctor: "
        />
        <p></p>
      </div>

      <button type="submit" style="border-radius: 5px; width: 500px">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import UploadImages from 'vue-upload-drop-images'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import PatientService from '@/services/PatientService.js'
export default {
  inject: ['GStore'],
  components: {
    UploadImages,
    BaseInput,
    BaseSelect
  },
  data() {
    return {
      patient: {
        imageUrls: [],
        first_name: '',
        last_name: '',
        age: '',
        hometown: '',
        vaccine_stat: '',
        vaccine_brand1: '',
        vaccine_date1: '',
        vaccine_brand2: '',
        vaccine_date2: '',
        doctor: { id: '', doctor_name: '' }
      },
      files: []
    }
  },
  methods: {
    addPatient() {
      console.log(this.files)
      Promise.all(
        this.files.map((file) => {
          return PatientService.uploadFile(file)
        })
      ).then((response) => {
        this.patient.imageUrls = response.map((r) => r.data)
        PatientService.savePatient(this.patient)
          .then((response) => {
            console.log(response)
            this.$router.push({
              name: 'PatientDetails',
              params: { id: response.data.id }
            })
            this.GStore.flashMessage =
              'Succcessfully add a new patient ' +
              response.data.first_name +
              ' ' +
              response.data.last_name
            setTimeout(() => {
              this.GStore.flashMessage = ''
            }, 3000)
          })
          .catch(() => {
            this.$router.push('NetworkError')
          })
      })
    },
    handleImages(files) {
      this.files = files
    }
  }
}
</script>
<style scoped>
.PatientForm {
  margin-top: 30px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  padding: 20px;
  margin: 20px 10px 20px 10px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
  -webkit-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  box-shadow: 2px 15px -12px rgba(0, 0, 0, 0.57);
}

label {
  font-weight: 300;
}

select {
  width: 50%;
}
</style>
