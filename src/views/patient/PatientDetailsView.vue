<template>
  <div class="block">
    {{ patient }}
    <img v-for="url in patient.imageUrls" :key="url" :src="url" />
    <p>Age: {{ patient.age }}</p>
    <p>Hometown: {{ patient.hometown }}</p>
  </div>
</template>

<script>
export default {
  props: ['id', 'patient']
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
img:hover {
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
}
.block {
  margin-top: 30px;
  border: 1px solid black;
  border-radius: 5px;
  text-align: center;
  margin-left: 400px;
  margin-right: 400px;
}
</style>
