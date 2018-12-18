
<template lang="pug">
  .container.game-browser
    .row.small-up-1.medium-up-3.large-up-4
      .column(v-for="game in games")
        game-card(:game="game")
      .column(v-if="games.length < 4")
        a.card.card--cta.card--new-game(@click="newGame")
          button.button.button--secondary New Game
    modal(ref="newGameModal")
      template(slot="content")
        h2 New Game
        form(@submit.prevent="createGame", novalidate)
          .form-input
            input(type="text", name="name", placeholder="Game Name", v-model="newGameName", v-validate="'required'")
            span.error(v-show="errors.has('name')") {{ errors.first('name') }}
          button(type="submit") Create
</template>

<script>
  import { mapState } from 'vuex'

  import Modal from '@/components/ui/Modal.vue'
  import GameCard from '@/components/card/GameCard.vue'

  export default {
    name: 'GameBrowser',
    components: { Modal, GameCard },
    data () {
      return {
        newGameName: ''
      }
    },
    computed: {
      ...mapState({
        currentUser: state => state.user.currentUser,
        games: state => state.games.all
      })
    },
    methods: {
      newGame () {
        this.$refs.newGameModal.open()
      },
      createGame () {
        this.$validator.validateAll().then((isValid) => {
          if (isValid) {
            this.$refs.newGameModal.close()
            this.$store.dispatch('games/create', { name: this.newGameName, created_by: this.currentUser.uid })
            this.newGameName = ''
            this.errors.clear()
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .game-browser {
    margin-top: 30px;
  }
</style>
