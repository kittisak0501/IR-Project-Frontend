<template>
  <router-link>
    <div class="genre-card">
      <span>{{ genre }}</span>
    </div>
  </router-link>
</template>
<script>
export default {
  name: 'GenreCard',
  props: {
    genre: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
.genre-card {
  padding: 20px;
  text-align: left;
  width: 97%;
  cursor: pointer;
  border: 1px solid #39495c;
  border-radius: 5px;
  margin-bottom: 18px;
}

.genre-card:hover {
  opacity: 100%;
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.genre-link {
  color: #2c3e50;
  text-decoration: none;
}
</style>
