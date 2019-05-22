
<template lang="pug">
  transition(name="fade")
    .container.u-mt.game(v-if="game && initialized")
      .row
        .column.small-12.large-8
          auto-textarea.game-input--header(v-if="isGameMaster", v-model="gameName", type="game", :h1="true")
          h1.game__title(v-else)
            span {{ game.name }}
          game-invite-link(v-if="isGameMaster", :slug="inviteSlug", :game="game.id")
          game-characters(v-if="$mq === 'mobile' || $mq === 'tablet'", :characters="characters")
          tabs(:sidebar="true")
            tab(heading="Journal", icon="quill", :selected="true")
              journal(:is-game-master="isGameMaster")
            tab(heading="Quest Log", icon="quest", v-if="$mq === 'mobile' || $mq === 'tablet'")
              quest-log(:game-id="game.id", :is-game-master="isGameMaster")
            tab(heading="NPCs", icon="npc", :is-game-master="isGameMaster")
              npcs(:game-id="game.id", :is-game-master="isGameMaster", :characters="characters", :campaign="game.campaign")
            tab(heading="Description", icon="info")
              .game__description(v-if="isGameMaster")
                wysiwyg(v-model="gameDescription")
              .game__description(v-else, v-html="game.description")
        .column.small-12.large-4(v-if="$mq !== 'mobile' && $mq !== 'tablet'")
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
  import Npcs from '@/components/npc/Npcs.vue'

  import AutoTextarea from '@/components/forms/AutoTextarea.vue'

  import Icon from '@/components/ui/Icon.vue'
  import Modal from '@/components/ui/Modal.vue'
  import Wysiwyg from '@/components/forms/Wysiwyg.vue'
  import Tab from '@/components/ui/Tab.vue'
  import Tabs from '@/components/ui/Tabs.vue'

  export default {
    name: 'Game',
    components: {
      GameInviteLink, GameCharacters,
      QuestLog, Journal, Npcs,
      AutoTextarea,
      Icon, Modal, Wysiwyg, Tab, Tabs
    },
    data () {
      return {
        isAllowed: false,
        initialized: false,
        gameName: '',
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
        return this.games.find(game => game.id === this.$route.params.id)
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

      let interval = setInterval(() => {
        if (this.authInitialized && this.games.length > 0) {
          clearInterval(interval)
          this.$nextTick(() => {
            this.checkPermissions()
          })
        }
      }, 300)
    },
    beforeRouteLeave (to, from, next) {
      this.$store.dispatch('journal/clear')
        .then(() => next())
    },
    watch: {
      gameName (newVal, oldVal) {
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
      checkPermissions () {
        if (!this.game) {
          this.redirect('Game not found, redirecting to your games...')
        } else if (this.game.created_by === this.currentUser.uid || this.game.players.indexOf(this.currentUser.uid) > -1) {
          this.populateGameData()
        } else {
          this.redirect('You may not have access to this game, redirecting to your games...')
        }
      },
      redirect (message) {
        this.$store.dispatch('loading/message', message)
        setTimeout(() => {
          this.$store.dispatch('loading/stop')
          this.$router.push({ name: 'games' })
        }, 3000)
      },
      populateGameData () {
        this.initialized = true
        this.gameName = this.game.name
        this.gameDescription = this.game.description
        this.$store.dispatch('characters/populate', this.game.id)
        this.$store.dispatch('journal/populate', this.game.id)
        this.$store.dispatch('loading/stop')
      },
      updateGame: debounce(function () {
        let updatedGame = {
          id: this.game.id,
          name: this.gameName,
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
      @include tablet-up {
        margin-bottom: $grid-gutter;
      }
    }

    [contenteditable="true"]:focus {
      outline: none;
    }
  }
</style>
