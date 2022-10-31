<template>
  <div id="flashMessage" v-if="GStore.flashMessage">
    {{ GStore.flashMessage }}
  </div>
  <div class="container">
    <div id="comment-container">
      <h3 style="font-weight: 700">Comments:</h3>
      <li
        v-for="doctorcomment in patient.doctorComments"
        :key="doctorcomment.id"
      >
        {{ doctorcomment.title }}: "{{ doctorcomment.comment }}"
        <p></p>
      </li>
    </div>
    <form id="comment-form" @submit.prevent="onSubmit" v-if="isAdmin">
      <h3 style="font-weight: 700">Add a Comment:</h3>
      <label for="title">Title:</label>
      <p></p>
      <input id="title" v-model="doctorcomments.title" />
      <p></p>
      <label for="comment">Comment:</label>
      <textarea id="comment" v-model="doctorcomments.comment"></textarea>
      <button type="submit" style="border-radius: 5px; width: 95%">
        Submit
      </button>
    </form>
  </div>
</template>
<script>
import PatientService from '@/services/PatientService'
import AuthService from '@/services/AuthService'
export default {
  props: ['id', 'patient'],
  inject: ['GStore'],
  data() {
    return {
      doctorcomments: {
        name: '',
        comment: '',
        patient: this.patient
      }
    }
  },
  methods: {
    onSubmit() {
      PatientService.addDoctorComments(this.doctorcomments)
        .then((response) => {
          console.log(response)
          this.$router.go()
          this.GStore.flashMessage = 'Successfully Added Comment.'
          setTimeout(() => {
            this.GStore.flashMessage = ''
          }, 3000)
        })
        .catch(() => {
          this.$router.push('NetworkError')
        })
    }
  },
  computed: {
    isAdmin() {
      return AuthService.hasRoles('ROLE_ADMIN')
    }
  }
}
</script>

<style scoped>
@keyframes bluefade {
  from {
    background: lightskyblue;
  }
  to {
    background: transparent;
  }
}
#flashMessage {
  animation-name: bluefade;
  animation-duration: 3s;
}
#comment-form {
  display: inline-block;
  width: 425px;
  padding: 20px;
  margin: 20px 10px 20px 10px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
  -webkit-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  box-shadow: 2px 15px -12px rgba(0, 0, 0, 0.57);
}

.comment-form .button {
  display: block;
  font-family: 'Roboto', sans-serif;
  margin: 10px auto;
  padding-left: 20px;
  padding-right: 20px;
}

select {
  height: 40px;
  font-size: 20px;
  background-color: white;
  cursor: pointer;
}

textarea {
  width: 95%;
  height: 70px;
  padding: 10px;
  font-size: 15px;
  font-weight: 300;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 20px;
}
#comment-container {
  display: inline-block;
  vertical-align: top;
  width: 425px;
  padding: 20px;
  margin: 20px 10px 20px 10px;
  background-color: white;
  -webkit-box-shadow: 0px 2px 20px -12px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 2px 20px -12px rgba(0, 0, 0, 0.57);
  box-shadow: 2px 20px -12px rgba(0, 0, 0, 0.57);
  border: 1px solid black;
  border-radius: 5px;
}
.comment-container li {
  margin-bottom: 0;
  text-align: left;
}
#title {
  width: 95%;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
}
</style>
