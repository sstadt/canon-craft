
<template lang="pug">
  transition-group(name="off-canvas-right")
    .side-panel--overlay(v-if="show", @click="close", key="overlay")
    .side-panel(v-if="show", v-touch:swipe.right="close", key="content")
      component(
        :is="componentName",
        :data="data",
        :characters="characters",
        :is-game-master="isGameMaster"
      )
</template>

<script>
  import { mapState } from 'vuex'

  import SidePanelNpc from '@/components/sidepanel/SidePanelNpc.vue'

  export default {
    name: 'SidePanel',
    components: { SidePanelNpc },
    computed: {
      ...mapState({
        show: state => state.sidepanel.show,
        type: state => state.sidepanel.type,
        data: state => state.sidepanel.data,
        currentUser: state => state.user.currentUser,
        loggedIn: state => state.user.loggedIn,
        authInitialized: state => state.user.authInitialized,
        games: state => state.games.all,
        allCharacters: state => state.characters.all,
        populatedGames: state => state.characters.populatedGames
      }),
      componentName () {
        return `side-panel-${this.type}`
      },
      activeGame () {
        return this.games.find(game => game.id === this.$route.params.id)
      },
      isGameMaster () {
        return this.currentUser && this.currentUser.uid === this.activeGame.created_by
      },
      characters () {
        return (this.activeGame.id) ? this.allCharacters.filter(character => character.game === this.activeGame.id) : null
      }
    },
    methods: {
      close () {
        this.$store.dispatch('sidepanel/close')
      }
    }
  }
</script>

<style lang="scss">
  .side-panel {
    display: flex;
    flex-direction: column;
    width: 400px;
    max-width: 90vw;
    background-color: #fff;
    border-left: 5px solid $body-bg--dark;
    box-shadow: 0 0 10px $overlay-bg;
    padding: $content-gutter;
    overflow-y: auto;
    overflow-x: hidden;

    &, &--overlay {
      position: fixed;
      top: 0;
      right: 0;
      height: 100%;
    }

    &--overlay {
      width: 100vw;
      background-color: transparent;
    }

    &__image {
      max-height: 200px;
      margin-bottom: $content-gutter;
    }

    &__title {
      flex-grow: 1;
    }

    &__header,
    &__title {
      padding-bottom: $content-gutter
    }

    &__header {
      &__content {
        display: flex;
      }

      &__controls {
        flex-shrink: 0;
      }
    }

    &__content {
      flex-grow: 1;
      flex-shrink: 0;
    }
  }
</style>