
<template lang="pug">
  .navbar
    router-link(to="/") Home
    router-link(to="/styleguide") Styleguide
    user-status
</template>

<script>
  import UserStatus from '@/components/navigation/UserStatus.vue'

  export default {
    name: 'Navbar',
    components: {
      UserStatus
    }
  }
</script>

<style scoped lang="scss">
</style>
