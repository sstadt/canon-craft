
<template lang="pug">
  .container.u-mt.game(v-if="game")
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
        h2 Quest Log
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

  import Icon from '@/components/ui/Icon.vue'
  import Modal from '@/components/ui/Modal.vue'

  export default {
    name: 'Game',
    components: {
      GameInviteLink,
      GameCharacters,
      Icon,
      Modal
    },
    computed: {
      ...mapState({
        currentUser: state => state.user.currentUser,
        games: state => state.games.all,
        allCharacters: state => state.characters.all
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
        return (this.game.id) ? this.allCharacters.filter(character => character.game === this.game.id) : []
      }
    },
    created () {
      if (this.game.id) {
        this.populateGameData()
      } else {
        let unwatch = this.$watch('game', (newVal) => {
          if (this.game.id) {
            unwatch()
            this.populateGameData()
          }
        })
      }
    },
    methods: {
      populateGameData () {
        this.$store.dispatch('characters/populate', this.game.id)
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
