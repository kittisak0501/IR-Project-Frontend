<template>
  <div class="col-md-12">
    <div class="card card-container">
      <h1 style="font-weight: 700">Sign-in</h1>
      <p></p>
      <img
        id="profile-img"
        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
        class="profile-img-card"
      />
      <div class="form-group">
        <div class="form-group">
          <input v-model="username" placeholder="Enter username:" type="text" />
          <input
            v-model="password"
            placeholder="Enter password:"
            type="password"
          />
        </div>
        <span v-if="$store.state.username != '' && $store.state.password != ''">
          <button @click="this.$store.dispatch('login')">Login</button>
        </span>
        <span v-else>
          <button class="empty">Login</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  computed: {
    username: {
      get() {
        return this.$store.state.username
      },
      set(input) {
        this.$store.commit('setUsernameInput', input)
      }
    },
    password: {
      get() {
        return this.$store.state.password
      },
      set(input) {
        this.$store.commit('setPasswordInput', input)
      }
    }
  }
}
</script>
<style scoped>
input {
  display: block;
  margin: 0 auto;
  margin-top: 25px;
  font-size: 20px;
  border-radius: 12px;
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
button {
  margin-top: 10px;
  border-radius: 7px;
  box-shadow: 1px 2px #88888847;
  font-size: 20px;
  cursor: pointer;
}
</style>
