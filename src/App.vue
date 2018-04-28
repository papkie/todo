<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from '@/components/Home'

export default {
  name: 'app',
  components: {
    Home,
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
