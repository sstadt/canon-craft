
<template lang="pug">
  .container.game-browser
    .row.small-up-1.medium-up-3.large-up-4
      .column(v-for="game in games")
        game-card(:game="game")
      .column(v-if="games.length < 4")
        a.card.card--cta.card--new-game(@click="newGame")
          primary-button(label="New Game", :secondary="true", @click="newGame")
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
  import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
  import GameCard from '@/components/card/GameCard.vue'

  export default {
    name: 'GameBrowser',
    components: { Modal, PrimaryButton, GameCard },
    data () {
      return {
        newGameName: ''
      }
    },
    computed: {
      ...mapState({
        currentUser: state => state.user.currentUser,
        userData: state => state.user.userData,
        loggedIn: state => state.user.loggedIn,
        authInitialized: state => state.user.authInitialized,
        games: state => state.games.all
      })
    },
    created () {
      this.redirect()
    },
    watch: {
      isLoggedIn () {
        this.redirect()
      },
      authInitialized () {
        this.redirect()
      }
    },
    methods: {
      redirect () {
        if (this.authInitialized && !this.loggedIn) {
          this.$router.push('/')
        }
      },
      newGame () {
        this.$refs.newGameModal.open()
      },
      createGame () {
        this.$validator.validateAll().then((isValid) => {
          if (isValid) {
            this.$refs.newGameModal.close()
            this.$store.dispatch('games/create', { 
              name: this.newGameName, 
              created_by: this.currentUser.uid,
              campaign: this.userData.config.defaultCampaign
            })
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
