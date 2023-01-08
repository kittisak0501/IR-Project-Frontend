<template>
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
      animes: null
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
</style>
