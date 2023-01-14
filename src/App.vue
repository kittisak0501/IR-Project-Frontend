<template>
  <nav class="navbar navbar-dark" style="background-color: lightskyblue">
    <router-link to="/" style="font-size: 25px">My Anime Search </router-link>
    <nav class="navbar-expand">
      <span v-if="this.$store.state.loggedIn == false">
        <router-link to="/login">
          <a class="login-button">Log in</a>
        </router-link>
      </span>
      <span v-else>
        <a class="logout-button" @click="this.$store.dispatch('logout')"
          >Log out</a
        >
      </span>
    </nav>
  </nav>
  <router-view />
</template>

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
