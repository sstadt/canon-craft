
<template lang="pug">
  .navbar
    slot(name="left")
    slot(name="right")
</template>

<script>
  export default {
    name: 'Navbar',
    props: {
      msg: String
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
