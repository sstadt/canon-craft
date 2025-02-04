
<template lang="pug">
  .quest
    primary-button.h3.quest__title(:text="true", :label="quest.title", @click="showDetails")
    .quest__objectives
      quest-objective(
        v-for="objective in quest.objectives",
        :key="objective.id",
        :objective="objective",
        :is-game-master="isGameMaster",
        @update-objective="updateObjectives"
      )
</template>

<script>
  import { mapState } from 'vuex'
  import { clone, debounce } from '@/lib/util'

  import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
  import IconButton from '@/components/buttons/IconButton.vue'
  import Icon from '@/components/ui/Icon.vue'
  import QuestObjective from '@/components/quest/QuestObjective.vue'
  import QuestCharacter from '@/components/quest/QuestCharacter.vue'

  export default {
    name: 'Quest',
    components: {
      PrimaryButton,
      IconButton,
      Icon,
      QuestObjective,
      QuestCharacter
    },
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
      },
      description () {
        return this.$sanitize(this.quest.description)
      }
    },
    methods: {
      updateObjectives ({ id, completed }) {
        let updatedQuest = {
          id: this.quest.id,
          objectives: clone(this.quest.objectives)
        }
        let objectiveIndex = updatedQuest.objectives.findIndex(objective => objective.id === id)

        updatedQuest.objectives[objectiveIndex].completed = completed
        this.$emit('update', updatedQuest)
      },
      showDetails () {
        this.$store.dispatch('sidepanel/showContent', {
          type: 'quest',
          data: this.quest
        })
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

      &:focus {
        outline: none;
      }

      &:hover {
        color: $color--primary--hover;
      }
    }

    &__characters {
      display: flex;
      justify-content: flex-end;
      margin-top: 4px;

      &__toggle-all {
        line-height: 28px;
        height: 28px;
        width: 28px;
        margin-left: 8px;
      }
    }

    .objectives {
      margin-bottom: $content-gutter;
    }
  }
</style>
