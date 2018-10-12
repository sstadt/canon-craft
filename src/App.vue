<template lang="pug">
  #app
    navbar
      template(slot="left")
        router-link(to="/") Home
        router-link(to="/styleguide") Styleguide
      template(slot="right")
        user-status
    router-view
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import UserStatus from '@/components/UserStatus'

export default {
  name: 'App',
  components: {
    Navbar,
    UserStatus
  }
}
</script>

<style lang="scss">
  @import 'theme/style';
</style>
