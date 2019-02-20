
<template lang="pug">
  .game-journal
    .controls
      .controls__group--left
        primary-button(label="New Entry", :small="true", @click="newEntry")
    .game-journal__entries
      div(v-for="entry in entries", :key="entry.id")
        journal-editor(
          v-if="isGameMaster", 
          :entry="entry",
          @remove="removeEntry(entry.id)"
          @save="saveEntry"
        )
        journal-entry(v-else, :entry="entry")
</template>

<script>
  import { mapState } from 'vuex'
  import { JournalEntry as newJournalEntry } from '@/schema/JournalEntry.js'

  import PrimaryButton from '@/components/ui/PrimaryButton.vue'
  import JournalEntry from '@/components/journal/JournalEntry.vue'
  import JournalEditor from '@/components/journal/JournalEditor.vue'

  export default {
    name: 'Journal',
    components: { PrimaryButton, JournalEntry, JournalEditor },
    props: {
      isGameMaster: Boolean
    },
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
      },
      removeEntry (id) {
        this.$store.dispatch('journal/remove', id)
      },
      saveEntry (entry) {
        console.log(entry)
        this.$store.dispatch('journal/update', entry)
      }
    }
  }
</script>

<style scoped lang="scss">
  .game-journal {
    & > .controls {
      margin-bottom: $grid-gutter;
    }
  }
</style>
