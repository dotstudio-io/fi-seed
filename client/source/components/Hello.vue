<template lang="pug">
.hello
  h1 {{ msg }}

  h2 Essential Links

  a(href='/world') Hello, Fi Seed!

  ul
    li
      a(href='https://vuejs.org', target='_blank', rel='noopener') Core Docs
    li
      a(href='https://forum.vuejs.org', target='_blank', rel='noopener') Forum
    li
      a(href='http://chat.vuejs.org/', target='_blank', rel='noopener') Vue Community Chat
    li
      a(href='https://twitter.com/vuejs', target='_blank', rel='noopener') Twitter
    li
      a(href='http://vuejs-templates.github.io/webpack/', target='_blank', rel='noopener') Docs for This Template

  h2 Ecosystem

  ul
    li
      a(href='http://router.vuejs.org/', target='_blank', rel='noopener') vue-router
    li
      a(href='http://vuex.vuejs.org/', target='_blank', rel='noopener') vuex
    li
      a(href='http://vue-loader.vuejs.org/', target='_blank', rel='noopener') vue-loader
    li
      a(href='https://github.com/vuejs/awesome-vue', target='_blank', rel='noopener') awesome-vue
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
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
