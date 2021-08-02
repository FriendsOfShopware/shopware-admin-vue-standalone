<template>
  <div id="app">
    <sw-button variant="primary" @click="onClick">test</sw-button>
    <sw-pagination :total="500" :limit="25" :page="1"></sw-pagination>
  </div>
</template>

<script>
export default {
  name: 'App',

  methods: {
    onClick() {
      alert('Test')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
