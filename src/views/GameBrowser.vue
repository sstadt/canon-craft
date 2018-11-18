
<template lang="pug">
    .container
      .row.reverse-tablet-up
        .column.small-12.medium-3
        .column.small-12.medium-9
          .row.small-up-1.medium-up-3
            .column(v-for="n in 4")
              a.card.card--game
                img(src="//placehold.it/335x150")
                .card__content
                  h3.card__title Game
                  p.card__description Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
            .column
              a.card.card--cta
                button.button.button--secondary New Game
</template>

<script>
  export default {
    name: 'GameBrowser'
  }
</script>

<style scoped lang="scss">
</style>
