
<template lang="pug">
  .container.game(v-if="game")
    h1 {{ game.name }}
    button.button.button--small(@click="editGame") Settings
    .game_description {{ game.description }}
    modal(ref="editGameModal")
      template(slot="content")
        form(@submit.prevent="updateGame", novalidate)
          .form-input
            input(type="text", name="name", placeholder="Name", v-model="game.name", v-validate="'required'")
            span.error(v-show="errors.has('name')") {{ errors.first('name') }}
          wysiwyg(v-model="game.description")
          button(type="submit") Update Game
</template>

<script>
  import { mapState } from 'vuex'

  import Modal from '@/components/ui/Modal.vue'

  export default {
    name: 'Game',
    components: { Modal },
    computed: {
      ...mapState({
        games: state => state.games.all
      }),
      game () {
        let game = this.games.filter(game => game.id === this.$route.params.id)
        return (game.length > 0) ? game[0] : {}
      }
    },
    methods: {
      editGame () {
        this.$refs.editGameModal.open()
      },
      updateGame () {
        let updatedGame = {
          id: this.game.id,
          name: this.game.name,
          description: this.game.description
        }

        this.$store.dispatch('games/update', updatedGame)
        this.$refs.editGameModal.close()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
