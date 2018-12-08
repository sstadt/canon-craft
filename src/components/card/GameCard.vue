
<template lang="pug">
  router-link.card.card--game(:to="gameLink")
    img(src="//placehold.it/335x150")
    .card__content
      h3.card__title {{ game.name }}
      p.card__description Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
</template>

<script>
  export default {
    name: 'GameCard',
    props: {
      game: Object
    },
    computed: {
      gameLink () {
        return `/game/${this.game.id}`
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
