
<template lang="pug">
  transition(name="fade")
    .container.u-mt.game(v-if="game && isAllowed")
      .row
        .column.small-12.medium-8
          .game-input.game-input--header(v-if="isGameMaster")
            input.h1(type="text", v-model="game.name")
          h1.u-mb(v-else)
            span.game__title {{ game.name }}
          game-invite-link(v-if="isGameMaster", :slug="inviteSlug", :game="game.id")
          tabs
            tab(heading="Journal", :selected="true")
              journal(:is-game-master="isGameMaster")
            tab(heading="Description")
              .game__description(v-if="isGameMaster")
                wysiwyg(v-model="gameDescription")
              .game__description(v-else, v-html="game.description")
        .column.small-12.medium-4
          game-characters(:characters="characters")
          quest-log(:game-id="game.id", :is-game-master="isGameMaster")
</template>

<script>
  import { mapState } from 'vuex'

  import { debounce } from '@/lib/util.js'

  import GameInviteLink from '@/components/game/GameInviteLink.vue'
  import GameCharacters from '@/components/game/GameCharacters.vue'
  import QuestLog from '@/components/quest/QuestLog.vue'
  import Journal from '@/components/journal/Journal.vue'

  import Icon from '@/components/ui/Icon.vue'
  import Modal from '@/components/ui/Modal.vue'
  import Wysiwyg from '@/components/ui/Wysiwyg.vue'
  import Tab from '@/components/ui/Tab.vue'
  import Tabs from '@/components/ui/Tabs.vue'

  export default {
    name: 'Game',
    components: {
      GameInviteLink, GameCharacters,
      QuestLog, Journal,
      Icon, Modal, Wysiwyg, Tab, Tabs
    },
    data () {
      return {
        isAllowed: false,
        initialized: false,
        gameDescription: ''
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
      },
      // description () {
      //   return this.game.description
      // },
      name () {
        return this.game.name
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
    destroyed () {
      this.$store.dispatch('journal/clear', this.game.id)
    },
    watch: {
      isLoggedIn (newVal, oldVal) {
        if (oldVal && !newVal) {
          this.$router.push('/')
        }
      },
      name (newVal, oldVal) {
        if (this.initialized && this.isGameMaster && oldVal && newVal !== oldVal) {
          this.updateGame()
        }
      },
      gameDescription (newVal, oldVal) {
        if (this.initialized && this.isGameMaster && oldVal && newVal !== oldVal) {
          this.updateGame()
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
          let unwatchPopulatedGames = this.$watch('characters', () => {
            if (this.populatedGames.indexOf(this.game.id) > -1 && this.characters) {
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
        this.initialized = true
        this.gameDescription = this.game.description
        this.$store.dispatch('characters/populate', this.game.id)
        this.$store.dispatch('journal/populate', this.game.id)
      },
      updateGame: debounce(function () {
        let updatedGame = {
          id: this.game.id,
          name: this.game.name,
          description: this.gameDescription
        }

        this.$store.dispatch('games/update', updatedGame)
      }, 5000)
    }
  }
</script>

<style lang="scss">
  .game {
    &__title {
      margin-right: 10px;
    }

    [contenteditable="true"]:focus {
      outline: none;
    }
  }
</style>
