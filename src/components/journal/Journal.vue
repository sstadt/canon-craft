
<template lang="pug">
  .game-journal
    .controls
      .controls__group--left
        primary-button(label="New Entry", :small="true", @click="newEntry")
    .game-journal__new-entry
      date-picker(v-model="newDate")
    .game-journal__entries
      game-journal-entry(v-for="entry in entries", :key="entry.id", :entry="entry")
</template>

<script>
  import { mapState } from 'vuex'
  import { JournalEntry as newJournalEntry } from '@/schema/JournalEntry.js'

  import PrimaryButton from '@/components/ui/PrimaryButton.vue'
  import DatePicker from '@/components/ui/DatePicker.vue'
  import GameJournalEntry from '@/components/journal/JournalEntry.vue'

  export default {
    name: 'Journal',
    components: { PrimaryButton, DatePicker, GameJournalEntry },
    data() {
      return {
        newDate: new Date()
      }
    },
    computed: {
      ...mapState({
        entries: state => state.journal.entries
      })
    },
    methods: {
      newEntry () {
        this.$store.dispatch('journal/create', newJournalEntry())
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
