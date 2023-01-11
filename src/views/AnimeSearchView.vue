<template>
  <form @submit.prevent="search">
    <input type="text" v-model="newname" placeholder="Search Anime..." />
    <button type="submit">Search</button>
    <button class="dummy">Search By</button>
    <select name="search filter" v-model="newfilter">
      <option value="Name">Name</option>
      <option value="Content">Content</option>
    </select>
  </form>
  <h2 style="font-weight: 700">Search Anime:</h2>
  {{ animes }}
  <div class="animes">
    <AnimeCard
      v-for="anime in animes"
      :key="anime.mal_id"
      :anime="anime"
    ></AnimeCard>
  </div>
</template>

<script>
import AnimeCard from '@/components/AnimeCard.vue'
import AnimeSearchService from '@/services/AnimeSearch.js'
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
      animes: null,
      newfilter: this.filter,
      newname: this.name
    }
  },
  components: {
    AnimeCard
  },
  methods: {
    search() {
      AnimeSearchService.searchAnimeByName(this.newname)
        .then((response) => {
          this.animes = response.data
          this.$router.push({
            name: 'AnimeSearch',
            query: { name: this.newname, filter: this.newfilter }
          })
        })
        .catch(() => {
          // next({ name: 'NetworkError' })
        })
    }
  },
  computed: {
    nameToUse() {
      return this.name
    }
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
