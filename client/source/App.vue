<template lang="pug">
#app
  header
    span Vue.js

  main
    img(src='./assets/logo.png' alt='Vue.js')
    router-view
</template>

<script>
export default {
  name: 'app'
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
