
<template lang="pug">
  .container.game(v-if="game")
    h1 {{ game.name }}
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Game',
    computed: {
      ...mapState({
        games: state => state.games.all
      }),
      game () {
        let game = this.games.filter(game => game.id === this.$route.params.id)
        return (game.length > 0) ? game[0] : {}
      }
    },
    created() {
      console.log(this.$route.params.id)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
