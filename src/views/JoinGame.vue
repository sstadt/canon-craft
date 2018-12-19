
<template lang="pug">
  .container
    .join-game
      p {{ $route.params.invite }}
      icon(name="compass-rose")
</template>

<script>
  import Icon from '@/components/ui/Icon.vue'

  export default {
    name: 'JoinGame',
    components: { Icon }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
