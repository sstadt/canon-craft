
<template lang="pug">
  .container.game-browser
    .row.small-up-1.medium-up-3.large-up-4
      .column(v-for="n in 2")
        a.card.card--game
          img(src="//placehold.it/335x150")
          .card__content
            h3.card__title Game
            p.card__description Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
      .column
        a.card.card--cta.card--new-game(@click="newGame")
          button.button.button--secondary New Game
</template>

<script>
  export default {
    name: 'GameBrowser',
    methods: {
      newGame () {
        alert('new game')
      }
    }
  }
</script>

<style scoped lang="scss">
  .game-browser {
    margin-top: 30px;
  }
</style>
