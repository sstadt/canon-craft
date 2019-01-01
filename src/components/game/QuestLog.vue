
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
</template>

<script>
  import { mapState } from 'vuex'
  import Quest from '@/schema/Quest'

  import Icon from '@/components/ui/Icon.vue'
  import Modal from '@/components/ui/Modal.vue'

  export default {
    name: 'QuestLog',
    components: { Icon, Modal },
    props: {
      gameId: String,
      isGameMaster: Boolean
    },
    computed: {
      ...mapState({
        allQuests: state => state.quests.all,
        populatedGames: state => state.quests.populatedGames
      }),
      isPopulated () {
        return this.populatedGames.indexOf(this.gameId) > -1
      }
    },
    methods: {
      newQuest () {
        console.log('new quest')
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
