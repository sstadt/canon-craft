
<template lang="pug">
  .game-card
    router-link.card.card--game(:to="gameLink")
      img(v-lazy="'/img/ph-NewGame.jpg'")
      .card__content
        h3.card__title {{ game.name }}
        p.card__description Your Role: {{ role }}
    context-menu.game-card__menu(v-if="isGameMaster")
      context-menu-item(icon="trash", label="Delete", @click="confirmDelete")
    confirm-dialog(ref="confirm")
</template>

<script>
  import { mapState } from 'vuex'

  import ContextMenu from '@/components/ui/ContextMenu.vue'
  import ContextMenuItem from '@/components/ui/ContextMenuItem.vue'
  import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'

  export default {
    name: 'GameCard',
    components: { ContextMenu, ContextMenuItem, ConfirmDialog },
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
      isGameMaster () {
        return this.currentUser.uid === this.game.created_by
      },
      gameLink () {
        return `/game/${this.game.id}`
      },
      role () {
        return this.isGameMaster ? 'Game Master' : 'Player'
      }
    },
    methods: {
      confirmDelete () {
        this.$refs.confirm.ask({
          message: `Are you sure you with to delete ${this.game.name}? This cannot be undone.`,
          callback: () => this.deleteGame()
        })
      },
      deleteGame () {
        console.log('delete')
        this.$store.dispatch('games/remove', this.game.id)
      }
    }
  }
</script>

<style scoped lang="scss">
  .game-card {
    position: relative;

    &__menu {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
</style>
