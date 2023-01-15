<template>
  <div class="anime-card">
    <div>
      <a class="anime-link" :href="anime.url">
        <h4 style="font-weight: bolder">
          <b>{{ anime.title }}</b>
        </h4>
        <br />
        <img :src="anime.images.webp.image_url" />
        <br />
        <span>Episodes: {{ anime.episodes }}</span
        ><br />
        <span>Season: {{ anime.season }} {{ anime.year }}</span
        ><br />
        <span>Genres: </span>
        <span v-for="genre in anime.genres" :key="genre.name"
          >{{ genre.name }} .
        </span>
        {{ anime.type }}
      </a>
    </div>
    <div v-if="this.$store.state.currentUser != null">
      <button :class="{ active: haveInFav }" @click="toggle(haveInFav)">
        {{ haveInFav ? 'BookMark ⭐' : 'BookMark ☆' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnimeCard',
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
        this.$store.state.currentUser.favorites.push(this.anime)
        isActive = true
      } else {
        this.$store.state.currentUser.favorites.pop(this.anime)
        isActive = false
      }
    }
  },
  computed: {
    haveInFav() {
      let Active = false
      if (this.$store.state.currentUser != null) {
        if (this.$store.state.currentUser.favorites.includes(this.anime)) {
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
