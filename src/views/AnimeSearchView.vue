<template>
  <router-link to="/bookmark" v-if="this.$store.state.currentUser != null"
    ><button class="bookmark">Book Mark</button></router-link
  >
  <span v-if="this.$store.state.loggedIn == true">
    <h4>Hello, {{ this.$store.state.currentUser.username }}</h4>
  </span>
  <form @submit.prevent="search">
    <input type="text" v-model="newquery" placeholder="Search Anime..." />
    <button type="submit">Search</button>
    <button class="dummy">Search By</button>
    <select name="search filter" v-model="newfilter">
      <option value="Name">Name</option>
      <option value="Content">Content</option>
    </select>
  </form>
  <h2 style="font-weight: 700">Search Anime:</h2>
  <div class="animes">
    <AnimeCard
      v-for="anime in animes"
      :key="anime.mal_id"
      :anime="anime"
    ></AnimeCard>
  </div>
</template>

<script>
import AnimeCard from '@/components/AnimeSearchCard.vue'
import AnimeSearchService from '@/services/AnimeSearch.js'
import { mapState } from 'vuex'
export default {
  name: 'AnimeSearchView',
  props: {
    page: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    filter: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      animes: [],
      similar: null,
      newfilter: this.filter,
      newquery: this.name
    }
  },
  components: {
    AnimeCard
  },
  methods: {
    search() {
      let searchFunction = AnimeSearchService.searchAnimeByContent
      if (this.newfilter == 'Name') {
        searchFunction = AnimeSearchService.searchAnimeByName
      }
      searchFunction(this.newquery)
        .then((response) => {
          if (response.data.response == '404') {
            alert('not found! Did you mean: ' + response.data.similar)
          }
          this.animes = response.data
          this.$store.state.anime = response.data
          this.$router.push({
            name: 'AnimeSearch',
            query: { name: this.newquery, filter: this.newfilter }
          })
        })
        .catch(() => {
          // next({ name: 'NetworkError' })
        })
      this.$store.commit('save')
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.currentUser.username,
      animes: (state) => state.anime.data
    })
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
.bookmark {
  display: inline-block;
  position: absolute;
  left: 50px;
  width: 200px;
  font-size: 20px;
  border: none;
  margin-top: 50px;
}
</style>
