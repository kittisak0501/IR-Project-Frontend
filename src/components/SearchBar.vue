<template>
  <input type="text" v-model="name" placeholder="Search Anime..." />
  <select name="search filter" v-model="filter">
    <option value="Search By Name">Search By Name</option>
    <option value="Search By Content">Search By Content</option>
  </select>
</template>
<script>
export default {
  name: 'SearchBar',
  props: {
    modelValue: {
      type: [String, Number, Object],
      default: ''
    }
  },
  data() {
    return {
      filter: 'Search By Name',
      name: ''
    }
  }
  // methods: {
  //   search() {
  //     AnimeAPIService.search(this.name)
  //       .then((response) => {
  //         console.log(response)
  //         this.$router.push({
  //           name: 'AnimeSearchView',
  //           params: { animes: response.data.data }
  //         })
  //         this.GStore.flashMessage = 'Succcessfully search anime'
  //         setTimeout(() => {
  //           this.GStore.flashMessage = ''
  //         }, 3000)
  //       })
  //       .catch(() => {
  //         this.$router.push('NetworkError')
  //       })
  //   }
  // }
}
</script>
<style scoped></style>
