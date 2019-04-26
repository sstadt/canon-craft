
<template lang="pug">
  .game-journal
    .game-controls
      search-control.game-controls__search(v-model="searchParam")
      sort-control.game-controls__sort(v-model="sortBy", :options="sortOptions")
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

  import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
  import JournalEntry from '@/components/journal/JournalEntry.vue'
  import JournalEditor from '@/components/journal/JournalEditor.vue'
  import SearchControl from '@/components/forms/SearchControl.vue'
  import SortControl from '@/components/forms/SortControl.vue'

  export default {
    name: 'Journal',
    components: { 
      PrimaryButton, 
      JournalEntry, 
      JournalEditor,
      SearchControl,
      SortControl
    },
    props: {
      isGameMaster: Boolean
    },
    data() {
      return {
        journalEntries: [],
        newDate: new Date(),
        searchParam: '',
        sortBy: 'recent',
        sortOptions: [{
          label: 'Most Recent',
          value: 'recent'
        }, {
          label: 'Oldest First',
          value: 'oldest'
        }]
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
        if (entry1.date.seconds > entry2.date.seconds) {
          return (ascending) ? 1 : -1
        }

        if (entry1.date.seconds < entry2.date.seconds) {
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
    &__entries > *:not(:first-child) {
      margin-top: $grid-gutter;
      padding-top: $grid-gutter;
      border-top: 1px solid #f4f4f4;
    }

    &__entry-wrapper {
      margin-bottom: $grid-gutter;
    }
  }
</style>
