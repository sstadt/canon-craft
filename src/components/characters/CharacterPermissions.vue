
<template lang="pug">
  .character-permissions
    character-share(
      v-for="character in characters",
      :key="character.id",
      :character="character",
      :players="players"
      @selected="togglePlayer(character.player)"
    )
    icon-button(label="Toggle All Characters", :flex="true", icon="users", classes="character-permissions__toggle-all", @click="toggleAll")
</template>

<script>
  import CharacterShare from '@/components/characters/CharacterShare.vue'
  import IconButton from '@/components/buttons/IconButton.vue'

  export default {
    name: 'CharacterPermissions',
    components: { CharacterShare, IconButton },
    props: {
      documentId: String,
      characters: Array,
      players: Array
    },
    methods: {
      togglePlayer (playerId) {
        this.$emit('toggleplayer', { document: this.documentId, player: playerId })
      },
      toggleAll () {
        if (this.players.length === this.characters.length) {
          this.$emit('disableall')
        } else {
          this.$emit('enableall')
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .character-permissions {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 4px;

    &__toggle-all {
      line-height: 28px;
      height: 28px;
      width: 28px;
      margin-left: 8px;
    }
  }
</style>