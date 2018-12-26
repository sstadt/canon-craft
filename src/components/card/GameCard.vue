
<template lang="pug">
  router-link.card.card--game(:to="gameLink")
    img(src="//placehold.it/335x150")
    .card__content
      h3.card__title {{ game.name }}
      p.card__description Your Role: {{ role }}
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'GameCard',
    props: {
      game: Object
    },
    created () {
      this.$store.dispatch('characters/populate', this.game.id)
    },
    computed: {
      ...mapState({
        currentUser: state => state.user.currentUser
      }),
      gameLink () {
        return `/game/${this.game.id}`
      },
      role () {
        return (this.currentUser.uid === this.game.created_by) ? 'Game Master' : 'Player'
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
