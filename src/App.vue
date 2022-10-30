<template>
  <nav class="navbar navbar-dark" style="background-color: lightskyblue">
    <router-link to="/" style="font-size: 25px">
      <font-awesome-icon icon="suitcase-medical" /> COVID VACCINATION
    </router-link>
    <nav class="navbar-expand">
      <ul v-if="!GStore.currentUser" class="navbar-nav ml-auto">
        <li class="nav-items">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
        <li class="nav-items">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </ul>
      <ul v-if="GStore.currentUser" class="navbar-nav ml-auto">
        <li class="nav-items" v-if="isAdmin">
          <router-link to="/add-patient" class="nav-link"
            ><font-awesome-icon icon="folder-plus" /> Add Patient</router-link
          >
        </li>
        <li class="nav-items">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ GStore.currentUser.doctor_name }}
          </router-link>
        </li>
        <li class="nav-items">
          <a class="nav-link" @click="logout">
            <font-awesome-icon icon="sign-out-alt" /> Logout
          </a>
        </li>
      </ul>
    </nav>
  </nav>
  <router-view />
</template>

<script>
import AuthService from '@/services/AuthService.js'
export default {
  inject: ['GStore'],
  computed: {
    currentUser() {
      return localStorage.getItem('user')
    },
    isAdmin() {
      return AuthService.hasRoles('ROLE_ADMIN')
    }
  },
  methods: {
    logout() {
      AuthService.logout()
      this.$router.go()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navbar a {
  float: left;
  font-weight: bold;
  color: white;
  text-decoration: none;
  font-weight: 700;
  font-size: 20px;
  padding-left: 10px;
  padding-right: 10px;
}

h4 {
  font-weight: 300;
  font-size: 17px;
}
span {
  font-weight: 400;
  font-size: 19px;
}
</style>
