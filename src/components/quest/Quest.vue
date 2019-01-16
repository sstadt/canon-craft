
<template lang="pug">
  .quest
    button.button.button--text.h3.quest__title(type="button", v-if="isGameMaster", @click="editQuest") {{ quest.title }}
    button.button.button--text.h3.quest__title(type="button", v-else, @click="showDetails") {{ quest.title }}
    .quest__characters(v-if="isGameMaster")
      quest-character(
        v-for="character in characters",
        :key="character.id",
        :character="character",
        :quest="quest",
        @selected="togglePlayer(character.player)"
      )
    .quest__objectives
      quest-objective(
        v-for="objective in quest.objectives",
        :key="objective.id",
        :objective="objective",
        :is-game-master="isGameMaster",
        @update-objective="updateObjectives"
      )
    missive(ref="questDetails", :title="quest.title", :content="quest.description")
</template>

<script>
  import { mapState } from 'vuex'
  import { clone, debounce } from '@/lib/util'

  import Missive from '@/components/ui/Missive.vue'
  import QuestObjective from '@/components/quest/QuestObjective.vue'
  import QuestCharacter from '@/components/quest/QuestCharacter.vue'

  export default {
    name: 'Quest',
    components: { Missive, QuestObjective, QuestCharacter },
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
      },
      togglePlayer: debounce(function (uid) {
        let playerIndex = this.quest.players.indexOf(uid)
        let updatedQuest = {
          id: this.quest.id,
          players: clone(this.quest.players)
        }

        if (playerIndex > -1) {
          updatedQuest.players.splice(playerIndex, 1)
        } else {
          updatedQuest.players.push(uid)
        }

        this.$emit('update', updatedQuest)
      }, 500),
      showDetails () {
        this.$refs.questDetails.open();
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
  }
</style>
