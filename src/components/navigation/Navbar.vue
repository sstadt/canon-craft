
<template lang="pug">
  .navbar
    slot(name="left")
    slot(name="right")
</template>

<script>
  export default {
    name: 'Navbar'
  }
</script>

<style scoped lang="scss">
</style>
