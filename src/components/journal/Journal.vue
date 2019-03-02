
<template lang="pug">
  .game-journal
    .controls
      .controls__group.game-journal__controls
        .controls-input.icon-input.game-journal__search-entries
          icon(name="search", size="14")
          input(type="text", v-model="searchParam", placeholder="Search Journal Entries")
        .controls-input.select
          select(v-model="sortBy")
            option(value="recent") Most Recent
            option(value="oldest") Oldest First
        primary-button(v-if="isGameMaster", label="New Entry", :small="true", @click="newEntry")
    .game-journal__entries
      transition-group(name="slide-fade-left")
        .game-journal__entry-wrapper(v-if="isGameMaster || entry.published", v-for="entry in journalEntries", :key="entry.id")
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
  import { clone, debounce } from '@/lib/util.js'
  import { JournalEntry as newJournalEntry } from '@/schema/JournalEntry.js'

  import Icon from '@/components/ui/Icon.vue'
  import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
  import JournalEntry from '@/components/journal/JournalEntry.vue'
  import JournalEditor from '@/components/journal/JournalEditor.vue'

  export default {
    name: 'Journal',
    components: { Icon, PrimaryButton, JournalEntry, JournalEditor },
    props: {
      isGameMaster: Boolean
    },
    data() {
      return {
        newDate: new Date(),
        sortBy: 'recent',
        searchParam: '',
        journalEntries: []
      }
    },
    computed: {
      ...mapState({
        entries: state => state.journal.entries
      })
    },
    watch: {
      sortBy () {
        this.filterAndSortEntries()
      },
      searchParam () {
        this.filterAndSortEntries()
      },
      entries () {
        this.filterAndSortEntries()
      }
    },
    methods: {
      filterAndSortEntries: debounce(function () {
        let entries = (this.searchParam.length > 2) ? this.filterEntries() : this.entries
        
        switch (this.sortBy) {
          case ('oldest'):
            entries = entries.sort((p, c) => this.sortEntriesByDate(p, c, true))
            break
          default: // 'recent'
            entries = entries.sort((p, c) => this.sortEntriesByDate(p, c, false))
        }

        this.journalEntries = clone(entries)
      }, 300),
      filterEntries () {
        let searchParam = this.searchParam.toLowerCase()

        return this.entries.filter(entry => {
          return Boolean(
            entry.title.toLowerCase().indexOf(searchParam) > -1 || 
            entry.description.toLowerCase().indexOf(searchParam) > -1
          )
        })
      },
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
    &__controls {
      margin-bottom: $grid-gutter;
      flex-grow: 1;
    }

    &__entries > *:not(:first-child) {
      margin-top: $grid-gutter;
      padding-top: $grid-gutter;
      border-top: 1px solid #f4f4f4;
    }

    &__search-entries {
      flex-grow: 1;
    }

    &__entry-wrapper {
      margin-bottom: $grid-gutter;
    }
  }
</style>
