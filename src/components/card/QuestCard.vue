
<template lang="pug">
  a.card.card--quest
    img(v-lazy="'//placehold.it/335x150'")
    .card__content
      h3.card__title Recent Quest
      p.card__status 0/1: Lorem Ipsum
      p.card__description Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
</template>

<script>
  export default {
    name: 'QuestCard'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
