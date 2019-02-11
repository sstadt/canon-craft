
<template lang="pug">
  .game-log
    .game-log__new-entry
      date-picker(v-model="newDate")
    .game-log__entries
      //- game-log-entry(v-for="entry in entries", :entry="entry")
</template>

<script>
  import { JournalEntry as newJournalEntry } from '@/schema/JournalEntry.js'

  import DatePicker from '@/components/ui/DatePicker.vue'
  import GameJournalEntry from '@/components/game/GameJournalEntry.vue'

  export default {
    name: 'GameLog',
    components: { DatePicker, GameJournalEntry },
    data() {
      return {
        newDate: new Date(),
        entries: []
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
