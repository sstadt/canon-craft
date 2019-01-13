
<template lang="pug">
  .quest
    button.button.button--text.h3(type="button", v-if="isGameMaster", @click="editQuest") {{ quest.title }}
    h3.quest__title(v-else) {{ quest.title }}
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Quest',
    props: {
      quest: Object,
      gameId: String,
      isGameMaster: Boolean
    },
    computed: {
      ...mapState({
        allCharacters: state => state.characters.all
      }),
      characters () {
        return this.allCharacters.filter(character => character.game === this.gameId)
      }
    },
    methods: {
      editQuest () {
        this.$emit('edit', this.quest.id)
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
