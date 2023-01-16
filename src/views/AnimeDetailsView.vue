<template>
  <div class="container">
    <h1>{{ anime.title }}</h1>
    <div>
      <img :src="anime.images.jpg.image_url" />
    </div>
    <h2 class="header">
      <span>Ranking: #{{ anime.rank }}</span>
      <span>Score: {{ anime.score }}</span>
      <span>Popularity: #{{ anime.popularity }}</span>
    </h2>
    <div class="block">
      <span> Genres: </span>
      <span v-for="genre in anime.genres" :key="genre.mal_id">
        {{ genre.name }} .
      </span>
      <br />
      <span v-if="anime.themes != []"> Themes: </span>
      <span v-if="anime.themes != []"
        ><span v-for="theme in anime.themes" :key="theme.mal_id">
          {{ theme.name }} .
        </span></span
      >

      <br />
      <span v-if="anime.studios != []"
        >Studio: {{ anime.studios[0].name }}</span
      >
    </div>
    <div v-if="this.$store.state.currentUser != null">
      <button :class="{ active: haveInFav }" @click.prevent="toggle(haveInFav)">
        {{ haveInFav ? 'BookMark ⭐' : 'BookMark ☆' }}
      </button>
    </div>
    <br />
    <h4>
      Episode(s): {{ anime.episodes }}
      <span v-if="anime.status == 'Finished Airing'">
        <span class="status-finish">{{ anime.status }}</span>
      </span>
      <span v-else>
        <span class="status-onair">{{ anime.status }}</span>
      </span>
    </h4>

    <hr />
    <div class="anime-synopsis">
      <h2>Synopsis</h2>
      <p><a class="tab"></a>{{ anime.synopsis }}</p>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'AnimeDetailsView',
  methods: {
    toggle(isActive) {
      if (!isActive) {
        this.$store.state.currentUser.favorites.push(
          this.$store.state.anime.mal_id
        )
      } else {
        var arr = this.$store.state.currentUser.favorites
        var index = arr.indexOf(this.$store.state.anime.mal_id)
        if (index > -1) {
          arr.splice(index, 1)
        }
        this.$store.state.currentUser.favorites = arr
      }
      this.$store.commit('save')
    }
  },
  computed: {
    haveInFav() {
      let Active = false
      if (this.$store.state.currentUser != null) {
        if (
          this.$store.state.currentUser.favorites.includes(
            this.$store.state.anime.mal_id
          )
        ) {
          Active = true
        }
      }
      return Active
    },
    ...mapState({
      user: (state) => state.currentUser.username,
      anime: (state) => state.anime
    })
  }
}
</script>
<style scoped>
.container {
  padding-left: 100px;
  padding-right: 100px;
  text-align: center;
}
.block {
  background-color: rgb(44, 115, 192);
  width: 600px;
  margin: 10px auto 10px auto;
  padding: 0px 7.5px;
  border-radius: 10px;
  border: 2.5px solid white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  font-weight: 1000;
  color: black;
}
hr {
  color: blue;
  border-top: 2px solid;
  margin-bottom: 0px;
}
.header {
  width: 600px;
  margin: 10px auto 10px auto;
  background-color: lightskyblue;
  padding-bottom: 10px;
  border-radius: 16px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
}
.header span {
  margin-right: 36px;
  font-weight: 500;
  color: black;
}
.status-finish {
  background-color: orangered;
  color: black;
  border-radius: 16px;
  border: 2px solid white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  width: fit-content;
  padding: 5px 10px;
  font-size: 16px;
}
.status-onair {
  background-color: green;
  color: white;
  border-radius: 16px;
  border: 2px solid white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  width: fit-content;
  padding: 5px 10px;
  font-size: 16px;
}
.anime-synopsis {
  margin-bottom: 200px;
}
</style>
