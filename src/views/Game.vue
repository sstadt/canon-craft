
<template lang="pug">
  .container.u-mt.game(v-if="game && isAllowed")
    .row
      .column.small-12.medium-8
        h1.u-mb
          span.game__title {{ game.name }}
          button.button.button--icon(v-if="isGameMaster", @click="editGame")
            span.u-hidden Settings
            icon(name="cog")
        game-invite-link(v-if="isGameMaster", :slug="inviteSlug", :game="game.id")
        .game_description {{ game.description }}
      .column.small-12.medium-4
        game-characters(:characters="characters")
        quest-log(:game-id="game.id", :is-game-master="isGameMaster")
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

  import GameInviteLink from '@/components/game/GameInviteLink.vue'
  import GameCharacters from '@/components/game/GameCharacters.vue'
  import QuestLog from '@/components/quest/QuestLog.vue'

  import Icon from '@/components/ui/Icon.vue'
  import Modal from '@/components/ui/Modal.vue'
  import Wysiwyg from '@/components/ui/Wysiwyg.vue'

  export default {
    name: 'Game',
    components: {
      GameInviteLink,
      GameCharacters,
      QuestLog,
      Icon,
      Modal,
      Wysiwyg
    },
    data () {
      return {
        isAllowed: false
      }
    },
    computed: {
      ...mapState({
        currentUser: state => state.user.currentUser,
        loggedIn: state => state.user.loggedIn,
        authInitialized: state => state.user.authInitialized,
        games: state => state.games.all,
        allCharacters: state => state.characters.all,
        populatedGames: state => state.characters.populatedGames
      }),
      game () {
        let game = this.games.filter(game => game.id === this.$route.params.id)
        return (game.length > 0) ? game[0] : {}
      },
      isGameMaster () {
        return this.currentUser && this.currentUser.uid === this.game.created_by
      },
      inviteSlug () {
        return (this.game.inviteLink) ? this.game.inviteLink : ''
      },
      characters () {
        return (this.game.id) ? this.allCharacters.filter(character => character.game === this.game.id) : null
      }
    },
    created () {
      this.$store.dispatch('loading/start', 'Setting up game...')

      if (this.authInitialized) {
        this.waitForPermissions()
        this.attemptToPopulate()
      } else {
        let unwatch = this.$watch('authInitialized', (newVal) => {
          if (newVal) {
            unwatch()
            this.waitForPermissions()
            this.attemptToPopulate()
          }
        })
      }
    },
    watch: {
      isLoggedIn (newVal, oldVal) {
        if (oldVal && !newVal) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      waitForPermissions () {
        if (!this.loggedIn) {
          this.$store.dispatch('loading/stop')
          this.$router.push('/')
        } else if (this.game.id && this.populatedGames.length > 0) {
          this.checkPermissions()
        } else {
          let unwatchPopulatedGames = this.$watch('populatedGames', () => {
            if (this.populatedGames.indexOf(this.game.id) > -1) {
              unwatchPopulatedGames()
              this.checkPermissions()
            }
          })
        }
      },
      checkPermissions () {
        this.$store.dispatch('loading/stop')

        if (this.game.created_by === this.currentUser.uid || this.characters.find(character => character.player === this.currentUser.uid)) {
          this.isAllowed = true
        } else {
          this.$router.push('/games')
        }
      },
      attemptToPopulate () {
        let isPopulated = false

        if (this.game.id) {
          isPopulated = true
          this.populateGameData()
        } else {
          let unwatchGame = this.$watch('game', (newVal) => {
            if (this.game.id) {
              isPopulated = true
              unwatchGame()
              this.populateGameData()
            }
          })
        }

        setTimeout(() => {
          if (!isPopulated) {
            this.$store.dispatch('loading/message', 'You may not have access to this game, redirecting to your games...')
            setTimeout(() => {
              this.$store.dispatch('loading/stop')
              this.$router.push('/games')
            }, 3000)
          }
        }, 10000)
      },
      populateGameData () {
        this.$store.dispatch('characters/populate', this.game.id)
        this.$store.dispatch('quests/populate', this.game.id)
      },
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

<style scoped lang="scss">
  .game {
    &__title {
      margin-right: 10px;
    }
  }
</style>
