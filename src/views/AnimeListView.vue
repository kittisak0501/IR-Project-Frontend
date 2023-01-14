<template>
  <span v-if="this.$store.state.loggedIn == true">
    <h4>Hello, {{ this.$store.state.currentUser.username }}</h4>
  </span>
  <form @submit.prevent="search">
    <input type="text" v-model="name" placeholder="Search Anime..." />
    <button type="submit">Search</button>
    <button class="dummy">Search By</button>
    <select name="search filter" v-model="filter">
      <option value="Name">Name</option>
      <option value="Content">Content</option>
    </select>
  </form>
  <h2 style="font-weight: 700">Anime:</h2>
  <div class="animes">
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'AnimeList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
      >
        Prev Page
      </router-link>

      <router-link
        id="page-next"
        :to="{ name: 'AnimeList', query: { page: page + 1 } }"
        rel="next"
        v-if="page < 876"
      >
        Next Page
      </router-link>
    </div>
    <AnimeCard
      v-for="anime in animes"
      :key="anime.mal_id"
      :anime="anime"
    ></AnimeCard>
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'AnimeList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
      >
        Prev Page
      </router-link>

      <router-link
        id="page-next"
        :to="{ name: 'AnimeList', query: { page: page + 1 } }"
        rel="next"
        v-if="page < 876"
      >
        Next Page
      </router-link>
    </div>
  </div>
</template>

<script>
import AnimeCard from '@/components/AnimeCard.vue'
import AnimeService from '@/services/AnimeAPIService.js'
export default {
  name: 'AnimeListView',
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    AnimeCard
  },
  data() {
    return {
      animes: null,
      filter: 'Name',
      name: ''
    }
  },
  methods: {
    search() {
      this.$router.push({
        name: 'AnimeSearch',
        query: { name: this.name, filter: this.filter }
      })
    }
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    AnimeService.getAnimes(parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
          comp.animes = response.data.data
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    AnimeService.getAnimes(parseInt(routeTo.query.page) || 1)
      .then((response) => {
        this.animes = response.data.data
        next()
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  computed: {
    // hasNextPage() {
    //   return this.pagination.has_next_page
    // }
  }
}
</script>
<style scoped>
h2 {
  text-align: left;
  margin-top: 30px;
  padding-left: 300px;
}
.animes {
  padding-left: 50px;
  padding-right: 50px;
}
.pagination {
  display: flex;
  width: 100%;
  padding: 30px;
  margin: 10px;
}

.pagination a {
  font-size: 20px;
  flex: 1;
  text-decoration: none;
  color: #3c3e50;
}

#page-prev {
  text-align: left;
}
#page-prev:hover {
  color: skyblue;
}
#page-next {
  text-align: right;
}
#page-next:hover {
  color: skyblue;
}

@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

input {
  display: inline-block;
  width: 350px;
  margin: 20px auto;
  padding: 10px 45px;
  background: white url('../assets/search-icon.svg') no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

select {
  display: inline-block;
  width: 90px;
  margin-left: 5px;
  padding: 10px 0px;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

button {
  display: inline-block;
  width: 80px;
  margin-left: 5px;
  padding: 10px 0px;
  background-size: 15px 15px;
  background: white;
  font-size: 16px;
}

.dummy {
  display: inline-block;
  width: 100px;
  margin-left: 5px;
  padding: 10px 0px;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
</style>
