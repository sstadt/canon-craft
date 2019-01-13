
<template lang="pug">
  .quest
    button.button.button--text.h3(type="button", v-if="isGameMaster", @click="editQuest") {{ quest.title }}
    h3.quest__title(v-else) {{ quest.title }}
    modal(ref="editQuestModal", v-if="isGameMaster")
      template(slot="content")
        quest-form(:quest="currentQuest", @submit="saveQuest", @cancel="cancelEditQuest", @remove="removeQuest")
</template>

<script>
  import { mapState } from 'vuex'

  import Modal from '@/components/ui/Modal.vue'
  import QuestForm from '@/components/quest/QuestForm.vue'

  export default {
    name: 'Quest',
    components: { Modal, QuestForm },
    props: {
      quest: Object,
      gameId: String,
      isGameMaster: Boolean
    },
    data () {
      return {
        currentQuest: JSON.parse(JSON.stringify(this.quest))
      }
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
        this.$refs.editQuestModal.open()
      },
      saveQuest () {
        this.$store.dispatch('quests/update', this.currentQuest)
        this.$refs.editQuestModal.close()
      },
      cancelEditQuest () {
        this.$refs.editQuestModal.close()
        this.currentQuest = JSON.parse(JSON.stringify(this.quest))
      },
      removeQuest () {
        this.$store.dispatch('quests/remove', this.quest.id)
        this.$refs.editQuestModal.close()
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
