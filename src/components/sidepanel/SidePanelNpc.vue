
<template lang="pug">
  .side-panel--npc
    .side-panel__header
      img.side-panel__image(v-lazy="image", v-if="image")
      .side-panel__header__content
        h2.side-panel__title {{ title }}
        .side-panel__header__controls
          template(slot="controls", v-if="isGameMaster")
            icon-button(label="Edit", icon="quill", @click="editNpc(data)")
      .side-panel__share
        .npcs__permissions(v-if="isGameMaster")
          character-permissions(
            :document-id="data.id",
            :characters="characters", 
            :players="data.players",
            @toggleplayer="togglePlayer",
            @enableall="enableAllPlayers"
            @disableall="disableAllPlayers"
          )
    .side-panel__content
      .content(v-html="description")
</template>

<script>
  import { mapState } from 'vuex'

  import CharacterPermissions from '@/components/characters/CharacterPermissions.vue'
  import IconButton from '@/components/buttons/IconButton.vue'

  export default {
    name: 'SidePanelNpc',
    components: { CharacterPermissions, IconButton },
    props: {
      data: Object,
      characters: Array,
      isGameMaster: Boolean
    },
    computed: {
      ...mapState({
        currentUser: state => state.user.currentUser
      }),
      title () {
        return this.data.name
      },
      image () {
        return this.data.image
      },
      description () {
        return this.$sanitize(this.data.description)
      }
    },
    methods: {
      editNpc () {
        console.log('edit npc')
      },
      togglePlayer () {
        console.log('toggle player')
      },
      enableAllPlayers () {
        console.log('enable all players')
      },
      disableAllPlayers () {
        console.log('disable all players')
      }
    }
  }
</script>

<style scoped lang="scss">
</style>