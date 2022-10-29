<template>
  <div class="block">
    <img v-for="url in patient.imageUrls" :key="url" :src="url" />
    <p>Age: {{ patient.age }}</p>
    <p>Hometown: {{ patient.hometown }}</p>
  </div>
</template>

<script>
export default {
  props: ['id', 'patient'],
  inject: ['GStore']
}
</script>

<style scoped>
img {
  border: 1px solid #ddd; /* Gray border */
  border-radius: 4px; /* Rounded border */
  padding: 5px; /* Some padding */
  margin: 5px; /* Some margin */
  width: 150px; /* Set a small width */
}
.block {
  margin-top: 30px;
}
</style>
