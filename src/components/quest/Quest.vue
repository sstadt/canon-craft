
<template lang="pug">
  .quest
    primary-button(v-if="isGameMaster", :text="true", :label="quest.title", classes="h3 quest__title", @click="editQuest")
    primary-button(v-else, :text="true", :label="quest.title", classes="h3 quest__title", @click="showDetails")
    .quest__characters(v-if="isGameMaster")
      icon-button(label="Toggle All Characters", :flex="true", icon="users", classes="quest__characters__toggle-all", @click="toggleAll")
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
    missive(ref="questDetails", :title="quest.title")
      template(slot="content")
        .objectives
          p(v-for="objective in quest.objectives") {{ objective.completed }}/{{ objective.goal }}: {{ objective.description }}
        div(v-html="description")
</template>

<script>
  import { mapState } from 'vuex'
  import { clone, debounce } from '@/lib/util'

  import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
  import IconButton from '@/components/buttons/IconButton.vue'
  import Missive from '@/components/ui/Missive.vue'
  import Icon from '@/components/ui/Icon.vue'
  import QuestObjective from '@/components/quest/QuestObjective.vue'
  import QuestCharacter from '@/components/quest/QuestCharacter.vue'

  export default {
    name: 'Quest',
    components: {
      PrimaryButton, IconButton,
      Missive, Icon,
      QuestObjective, QuestCharacter
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
      toggleAll: debounce(function () {
        let newPlayers = []

        if (this.characters.length > this.quest.players.length) {
          newPlayers = clone(this.characters).map(character => character.player)
        }

        this.$emit('update', {
          id: this.quest.id,
          players: newPlayers
        });
      }),
      showDetails () {
        this.$refs.questDetails.open()
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

      &__toggle-all {
        line-height: 32px;
        width: 32px;
        margin-right: 8px;
      }
    }

    .objectives {
      margin-bottom: 30px;
    }
  }
</style>
