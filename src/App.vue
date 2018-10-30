
<template lang="pug">
  #app
    navbar
    transition(name="fade", mode="out-in")
      router-view
</template>

<script>
  import Navbar from '@/components/navigation/Navbar.vue'

  export default {
    name: 'App',
    components: {
      Navbar
    }
  }
</script>

<style lang="scss">
  @import 'theme/style';
</style>
