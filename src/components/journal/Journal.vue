
<template lang="pug">
  .game-journal
    .controls
      .controls__group
        .controls-input.select
          select(v-model="sortBy")
            option(value="recent") Most Recent
            option(value="oldest") Oldest First
        primary-button(v-if="isGameMaster", label="New Entry", :small="true", @click="newEntry")
    .game-journal__entries
      div(v-if="isGameMaster || entry.published", v-for="entry in entries", :key="entry.id")
        journal-editor(
          v-if="isGameMaster", 
          :entry="entry",
          @remove="removeEntry(entry.id)"
          @save="saveEntry"
        )
        journal-entry(v-else-if="entry.published", :entry="entry")
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
        newDate: new Date(),
        sortBy: 'recent'
      }
    },
    computed: {
      ...mapState({
        entries: state => state.journal.entries
      }),
      journalEntries () {
        let entries

        switch (this.sortBy) {
          case ('oldest'):
            entries = this.entries.sort((p, c) => this.sortEntriesByDate(p, c, true))
            break;
          default: // 'recent'
            entries = this.entries.sort((p, c) => this.sortEntriesByDate(p, c, false))
        }

        return entries
      }
    },
    methods: {
      sortEntriesByDate (entry1, entry2, ascending = false) {
        if (entry1.date.nanoseconds > entry2.date.nanoseconds) {
          return (ascending) ? 1 : -1
        }

        if (entry1.date.nanoseconds < entry2.date.nanoseconds) {
          return (ascending) ? -1 : 1
        }

        return 0
      },
      newEntry () {
        this.$store.dispatch('journal/create', newJournalEntry())
      },
      removeEntry (id) {
        this.$store.dispatch('journal/remove', id)
      },
      saveEntry (entry) {
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

    &__entries > *:not(:first-child) {
      margin-top: $grid-gutter;
      padding-top: $grid-gutter;
      border-top: 1px solid #f4f4f4;
    }
  }
</style>
