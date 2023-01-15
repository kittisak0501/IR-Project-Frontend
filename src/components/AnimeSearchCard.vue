<template>
  <div class="anime-card">
    <h4 style="font-weight: bolder">
      <b>{{ anime.title }}</b>
    </h4>
    <br />
    <img :src="anime.main_picture" />
    <br />
    <span>Episodes: {{ anime.episodes }}</span
    ><br />
    <span>Season: {{ anime.season }} {{ anime.year }}</span
    ><br />
    <span>synopsis: </span>
    <span>{{ anime.synopsis.substr(0, 50) }} ... </span>
    <br />
    <span>Score: </span>
    <span>{{ anime.score }}</span>
    <div v-if="this.$store.state.currentUser != null">
      <button :class="{ active: haveInFav }" @click="toggle(haveInFav)">
        {{ haveInFav ? 'BookMark ⭐' : 'BookMark ☆' }}
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AnimeSearchCard',
  props: {
    anime: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    toggle(isActive) {
      if (!isActive) {
        this.$store.state.currentUser.favorites.push(this.anime.mal_id)
        // isActive = true
      } else {
        this.$store.state.currentUser.favorites.pop(this.anime.mal_id)
        // isActive = false
      }
    }
  },
  computed: {
    haveInFav() {
      let Active = false
      if (this.$store.state.currentUser != null) {
        if (
          this.$store.state.currentUser.favorites.includes(this.anime.mal_id)
        ) {
          Active = true
        }
      }
      return Active
    }
  }
}
</script>
<style scoped>
.anime-card {
  display: inline-block;
  vertical-align: top;
  padding: 20px;
  width: 18%;
  max-height: 450px;
  height: 450px;
  cursor: pointer;
  border: 1px solid #1a467d;
  margin: 5px;
}

.anime-card:hover {
  opacity: 100%;
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.anime-link {
  color: #2c3e50;
  text-decoration: none;
}

span {
  font-size: small;
  margin: 0;
}
h4 {
  margin: 0;
}
img {
  height: 230px;
}
</style>
