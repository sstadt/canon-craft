
<template lang="pug">
  .quest-log
    .quest-log__header(v-if="$mq !== 'mobile'")
      h2.quest-log__title Quest Log
      icon-button(v-if="isGameMaster", label="New Quest", icon="add-quest", @click="createQuest")
    .controls(v-if="$mq === 'mobile' && isGameMaster")
      .controls__group
        primary-button(label="New Quest", :small="true", @click="createQuest")
    transition(name="fade", mode="out-in")
      .quest-log__quests
        transition-group(name="slide-fade-left")
          quest(
            v-for="quest in quests",
            :quest="quest",
            :game-id="gameId",
            :is-game-master="isGameMaster",
            :key="quest.id",
            @edit="editQuest(quest)",
            @update="updateQuest"
          )
      //- .content-loader(v-else)
        p.content-loader__title Loading Quests...
        icon(name="compass-rose", size="30px")
    modal(ref="newQuestModal", v-if="isGameMaster")
      template(slot="content")
        quest-form(:quest="newQuest", @submit="saveNewQuest", @cancel="closeNewQuestModal")
    modal(ref="editQuestModal", v-if="isGameMaster")
      template(slot="content")
        quest-form(:quest="currentQuest", @submit="saveQuest", @cancel="cancelEditQuest", @remove="removeQuest")
</template>

<script>
  import { mapState } from 'vuex'
  import { Quest as newQuest } from '@/schema/Quest'
  import { Objective as newObjective } from '@/schema/Objective'
  import { getSampleQuest } from '@/lib/config.sample-quests'
  import { clone } from '@/lib/util'

  import Modal from '@/components/ui/Modal.vue'
  import Quest from '@/components/quest/Quest.vue'
  import QuestForm from '@/components/quest/QuestForm.vue'
  import IconButton from '@/components/buttons/IconButton.vue'
  import PrimaryButton from '@/components/buttons/PrimaryButton.vue'

  export default {
    name: 'QuestLog',
    components: { 
      IconButton, PrimaryButton, Modal,
      Quest, QuestForm
    },
    props: {
      gameId: String,
      isGameMaster: Boolean
    },
    data () {
      return {
        newQuest: {},
        currentQuest: {}
      }
    },
    computed: {
      ...mapState({
        currentUser: state => state.user.currentUser,
        allQuests: state => state.quests.all,
        populatedGames: state => state.quests.populatedGames
      }),
      isPopulated () {
        return this.populatedGames.indexOf(this.gameId) > -1
      },
      quests () {
        return this.allQuests.filter((quest) => quest.game === this.gameId)
      }
    },
    methods: {
      createQuest () {
        this.newQuest = newQuest({
          ...getSampleQuest(),
          created_by: this.currentUser.uid,
          game: this.gameId,
          objectives: [ newObjective() ]
        })
        this.$refs.newQuestModal.open()
      },
      saveNewQuest (quest) {
        this.$refs.newQuestModal.close()
        this.$store.dispatch('quests/create', quest)
      },
      closeNewQuestModal () {
        this.$refs.newQuestModal.close()
      },
      editQuest (quest) {
        this.currentQuest = clone(quest)
        this.$refs.editQuestModal.open()
      },
      saveQuest () {
        // NOTE: for saving the full current quest i.e. new quest or edit quest modal
        this.$refs.editQuestModal.close()
        this.$store.dispatch('quests/update', this.currentQuest)
      },
      cancelEditQuest () {
        this.$refs.editQuestModal.close()
      },
      removeQuest () {
        this.$refs.editQuestModal.close()
        this.$store.dispatch('quests/remove', this.currentQuest.id)
      },
      updateQuest (updatedQuest) {
        // NOTE: For passing a partial quest direct to update i.e. quick objective/player updates
        this.$store.dispatch('quests/update', updatedQuest)
      }
    }
  }
</script>

<style lang="scss">
  .quest-log {
    &__header {
      position: relative;

      @include mobile-only {
        display: flex;
        justify-content: flex-end;
      }

      @include tablet-up {
        .button {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        }
      }
    }

    &__title {
      padding-right: 30px;
    }
  }
</style>
