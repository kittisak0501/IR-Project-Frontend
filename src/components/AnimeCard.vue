<template>
  <router-link
    class="anime-link"
    :to="{ name: 'AnimeDetails', params: { id: anime.id } }"
  >
    <div class="anime-card">
      <span>Name: {{ anime.first_name }} {{ anime.last_name }}</span>
      <h4>{{ anime.vaccine_stat }}</h4>
    </div>
  </router-link>
</template>
<script>
export default {
  name: 'AnimeCard',
  props: {
    anime: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
.anime-card {
  padding: 20px;
  text-align: left;
  width: 97%;
  cursor: pointer;
  border: 1px solid #39495c;
  border-radius: 5px;
  margin-bottom: 18px;
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
</style>
