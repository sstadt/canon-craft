
<template lang="pug">
  .quest-log
    .quest-log__header
      h2.quest-log__title Quest Log
      a.button.button--icon(@click="newQuest", v-if="isGameMaster")
        .u-hidden New Quest
        icon(name="quest")
    transition(name="fade", mode="out-in")
      .quest-log__quests(v-if="isPopulated")
        p Quest list
      .content-loader(v-else)
        p.content-loader__title Loading Quests...
        icon(name="compass-rose", size="30px")
    modal(ref="newQuestModal")
      template(slot="content")
        quest-form(:quest="newQuest", @save="saveQuest")
</template>

<script>
  import { mapState } from 'vuex'
  import Quest from '@/schema/Quest'
  import Objective from '@/schema/Objective'

  import Icon from '@/components/ui/Icon.vue'
  import Modal from '@/components/ui/Modal.vue'
  import QuestForm from '@/components/quest/QuestForm.vue'

  export default {
    name: 'QuestLog',
    components: { Icon, Modal, QuestForm },
    props: {
      gameId: String,
      isGameMaster: Boolean
    },
    data () {
      return {
        newQuest: new Quest({
          title: '',
          description: '',
          objectives: [ new Objective() ]
        })
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
      }
    },
    methods: {
      newQuest () {
        this.$refs.newQuestModal.open()
      },
      saveQuest (arg) {
        console.log('save!', arg)
      }
    }
  }
</script>

<style scoped lang="scss">
  .quest-log {
    &__header {
      position: relative;

      .button {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
    }

    &__title {
      padding-right: 30px;
    }
  }
</style>
