<template lang="pug">
.world
  h1 {{ msg }}

  a(href='/') Home
</template>

<script>
export default {
  name: 'world',
  data() {
    return {
      msg: 'This is the world!'
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
