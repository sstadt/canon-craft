
<template lang="pug">
  .quest
    primary-button(v-if="isGameMaster", :text="true", :label="quest.title", classes="h3 quest__title", @click="editQuest")
    primary-button(v-else, :text="true", :label="quest.title", classes="h3 quest__title", @click="showDetails")
    .quest__objectives
      quest-objective(
        v-for="objective in quest.objectives",
        :key="objective.id",
        :objective="objective",
        :is-game-master="isGameMaster",
        @update-objective="updateObjectives"
      )
    .quest__characters(v-if="isGameMaster")
      quest-character(
        v-for="character in characters",
        :key="character.id",
        :character="character",
        :quest="quest",
        @selected="togglePlayer(character.player)"
      )
      icon-button(label="Toggle All Characters", :flex="true", icon="users", classes="quest__characters__toggle-all", @click="toggleAll")
    //- side-panel(ref="questDetails", :title="quest.title")
      template(slot="content")
        .objectives
          p(v-for="objective in quest.objectives") {{ objective.completed }}/{{ objective.goal }}: {{ objective.description }}
        .content(v-html="description")
</template>

<script>
  import { mapState } from 'vuex'
  import { clone, debounce } from '@/lib/util'

  import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
  import IconButton from '@/components/buttons/IconButton.vue'
  import Icon from '@/components/ui/Icon.vue'
  // TODO: trigger store event instead of keeping sidepanel here
  // import SidePanel from '@/components/ui/SidePanel.vue'
  import QuestObjective from '@/components/quest/QuestObjective.vue'
  import QuestCharacter from '@/components/quest/QuestCharacter.vue'

  export default {
    name: 'Quest',
    components: {
      PrimaryButton, IconButton,
      Icon,
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
      }, 300),
      toggleAll: debounce(function () {
        let newPlayers = []

        if (this.characters.length > this.quest.players.length) {
          newPlayers = clone(this.characters).map(character => character.player)
        }

        this.$emit('update', {
          id: this.quest.id,
          players: newPlayers
        });
      }, 300),
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
