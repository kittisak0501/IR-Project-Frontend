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
    </nav>
  </nav>
  <router-view />
</template>

<script>
export default {
  inject: ['GStore']
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
