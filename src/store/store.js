import { createStore } from 'vuex'
import loginService from '../services/LoginService'
import router from '@/router'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
export default createStore({
  state: {
    loggedIn: false,
    users: [
      {
        username: 'kitti',
        password: 'kitti',
        favorites: []
      },
      {
        username: 'user',
        password: '123',
        favorites: []
      }
    ],
    currentUser: { username: '', favorites: [] },
    username: '',
    password: ''
  },
  actions: {
    login() {
      let result = loginService.login(
        this.state.username,
        this.state.password,
        this.state.users
      )
      if (result) {
        this.commit('loginSuccess')
        router.push('/')
      } else {
        this.commit('loginFail')
        alert('Invalid username or password')
      }
    },
    logout() {
      this.commit('resetState')
      router.push('/login')
    }
  },
  mutations: {
    resetState(state) {
      this.state.loggedIn = false
      state.currentUser = state.currentUser = { username: '', favorites: [] }
      if (router.currentRoute.value.fullPath == '/bookmark') {
        router.go(-1)
      } else {
        router.push('')
      }
    },
    loginSuccess(state) {
      state.loggedIn = true
      state.currentUser = { username: this.state.username, favorites: [] }
      state.username = ''
      state.password = ''
    },
    loginFail(state) {
      state.loggedIn = false
      state.username = ''
      state.password = ''
    },
    setUsernameInput(state, input) {
      state.username = input
    },
    setPasswordInput(state, input) {
      state.password = input
    },
    save(state) {
      localStorage.setItem('state', state)
    }
  },
  getters: {},
  modules: {},
  plugins: [vuexLocal.plugin]
})
