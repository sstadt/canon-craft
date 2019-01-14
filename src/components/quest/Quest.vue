
<template lang="pug">
  .quest
    button.button.button--text.h3.quest__title(type="button", v-if="isGameMaster", @click="editQuest") {{ quest.title }}
    h3.quest__title(v-else) {{ quest.title }}
    quest-objective(
      v-for="objective in quest.objectives",
      :key="objective.id",
      :objective="objective",
      :is-game-master="isGameMaster",
      @update-objective="updateObjectives"
    )
    //- need to make this a child component
    button.button.button--icon(
      type="button",
      v-if="isGameMaster",
      v-for="character in characters",
      @click="toggleCharacterShare(character.id)"
    )
      span.u-hidden Toggle availability for {{ character.name }}
      img(:src="character.avatar")
</template>

<script>
  import { mapState } from 'vuex'
  import { clone } from '@/lib/util'

  import QuestObjective from '@/components/quest/QuestObjective.vue'

  export default {
    name: 'Quest',
    components: { QuestObjective },
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
      },
      updateObjectives ({ id, completed }) {
        let updatedQuest = {
          id: this.quest.id,
          objectives: clone(this.quest.objectives)
        }
        let objectiveIndex = updatedQuest.objectives.findIndex(objective => objective.id === id)

        updatedQuest.objectives[objectiveIndex].completed = completed
        this.$emit('update', updatedQuest)
      }
    }
  }
</script>

<style scoped lang="scss">
  .quest {
    margin-top: $content-gutter;

    &__title {
      color: $body-text--main;
      line-height: 2;

      &:hover {
        color: $color--primary--hover;
      }
    }
  }
</style>
