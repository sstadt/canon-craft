
<template lang="pug">
  .game-card
    router-link.card.card--game(:to="gameLink")
      img(v-lazy="'/img/ph-NewGame.jpg'")
      .card__content
        h3.card__title {{ game.name }}
        p.card__description Your Role: {{ role }}
    context-menu.game-card__menu
      context-menu-item(icon="trash", label="Delete")
</template>

<script>
  import { mapState } from 'vuex'

  import ContextMenu from '@/components/ui/ContextMenu.vue'
  import ContextMenuItem from '@/components/ui/ContextMenuItem.vue'

  export default {
    name: 'GameCard',
    components: { ContextMenu, ContextMenuItem },
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
  .game-card {
    position: relative;

    &__menu {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
</style>
