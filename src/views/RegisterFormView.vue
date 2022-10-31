<template>
  <div class="col-md-12" style="margin-top: 30px">
    <div class="card card-container">
      <h1 style="font-weight: 700">Getting Started</h1>
      <p></p>
      <img
        id="profile-img"
        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
        class="profile-img-card"
      />
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="firstname">First_name:</label>
            <Field name="firstname" type="text" class="form-control" />
            <ErrorMessage name="firstname" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="lastname">Last_name:</label>
            <Field name="lastname" type="text" class="form-control" />
            <ErrorMessage name="lastname" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="username">Username:</label>
            <Field name="username" type="text" class="form-control" />
            <ErrorMessage name="username" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <Field name="email" type="email" class="form-control" />
            <ErrorMessage name="email" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <Field name="password" type="password" class="form-control" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>
          <div class="form-group">
            <button
              class="btn btn-info btn-block"
              style="background-color: lightskyblue"
              :disabled="loading"
            >
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Sign Up
            </button>
          </div>
        </div>
      </Form>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>
<script>
import AuthService from '@/services/AuthService.js'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
export default {
  name: 'RegisterView',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  //eslint-disable-next-line
    inject:['GStore'],
  data() {
    const schema = yup.object().shape({
      firstname: yup
        .string()
        .required('First name is required!')
        .min(3, 'Must be at least 3 charaacter!')
        .max(20, 'Must be maximum 20 characters!'),
      lastname: yup
        .string()
        .required('Last name is required!')
        .min(3, 'Must be at least 3 charaacter!')
        .max(20, 'Must be maximum 20 characters!'),
      username: yup
        .string()
        .required('Username is required!')
        .min(3, 'Must be at least 3 charaacter!')
        .max(20, 'Must be maximum 20 characters!'),
      email: yup
        .string()
        .required('Email is required!')
        .email('Email is invalid!')
        .max(50, 'Must be maximum 50 characters!'),
      password: yup
        .string()
        .required('Password is required!')
        .min(6, 'Must be at least 6 characters!')
        .max(40, 'Must be maximum 40 characters!')
    })
    return {
      successful: false,
      loading: false,
      message: '',
      schema
    }
  },
  mounted() {
    if (this.GStore.currentUser) {
      this.$router.push('/')
    }
  },
  methods: {
    // eslint-disable-next-line
        handleRegister(user){
      AuthService.register(user)
        .then(() => {
          this.$router.push({ path: '/login' })
        })
        .catch(() => {
          this.message = 'could not register'
        })
      this.message = ''
      this.successful = false
      this.loading = true
    }
  }
}
</script>
<style scoped>
label {
  display: block;
  margin-top: 10px;
  font-weight: 300;
}
.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}
.card {
  background-color: white;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
.error-feedback {
  color: red;
  font-weight: 300;
}
</style>
