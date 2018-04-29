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
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-image: url('https://i0.wp.com/ficedu.org/wp-content/uploads/2016/07/Savin-NY-Website-Background-Web.jpg');
  background-attachment: fixed;
}

h3 {
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: normal;
  font-style: normal;
}

.shadowEffect {
  &:hover {
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.075),
      0 6px 10px 0 rgba(0, 0, 0, 0.19);
  }
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.445), 0 3px 3px 0 rgba(0, 0, 0, 0.19);
}
</style>
