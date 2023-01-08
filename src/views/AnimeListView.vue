<template>
  <h2 style="font-weight: 700">Anime:</h2>
  <div class="animes">
    <AnimeCard
      v-for="anime in animes"
      :key="anime.mal_id"
      :anime="anime"
    ></AnimeCard>
    {{ animes }}
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
      data: null,
      animes: null
    }
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    AnimeService.getAnimes(parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
          comp.animes = response.data.data[0]
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
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
  display: flex;
  flex-direction: column;
  align-items: left;
  padding-left: 300px;
  padding-right: 250px;
}
.pagination {
  display: flex;
  width: 100%;
  padding-right: 30px;
  margin-bottom: 20px;
}

.pagination a {
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
