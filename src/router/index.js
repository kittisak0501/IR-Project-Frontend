import { createRouter, createWebHistory } from 'vue-router'
import AnimeListView from '@/views/AnimeListView.vue'
import AnimeSearchView from '@/views/AnimeSearchView.vue'
import AnimeBookmarkView from '@/views/AnimeBookMarkView.vue'
import AnimeDetailsView from '@/views/AnimeDetailsView.vue'
import NProgress from 'nprogress'
import NetWorkErrorView from '@/views/NetworkErrorView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import Login from '@/views/LoginFormView.vue'
import AnimeAPIService from '@/services/AnimeAPIService.js'
import store from '@/store/store.js'

const routes = [
  {
    path: '/',
    name: 'AnimeList',
    component: AnimeListView,
    props: (route) => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/search',
    name: 'AnimeSearch',
    component: AnimeSearchView,
    props: (route) => ({
      page: parseInt(route.query.page) || 1,
      name: route.query.name,
      filter: route.query.filter
    })
  },
  {
    path: '/bookmark',
    name: 'AnimeBookmark',
    component: AnimeBookmarkView
  },
  {
    path: '/:id',
    name: 'AnimeDetails',
    component: AnimeDetailsView,
    beforeEnter: (to) => {
      return AnimeAPIService.getAnime(to.params.id).then((response) => {
        store.state.anime = response.data.data
        console.log(store.state.anime)
      })
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFoundView,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundView
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetWorkErrorView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
router.beforeEach(() => {
  NProgress.start()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
