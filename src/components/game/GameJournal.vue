
<template lang="pug">
  .game-log
    .game-log__new-entry
      date-picker(v-model="newDate")
    .game-log__entries
      //- game-log-entry(v-for="entry in entries", :entry="entry")
</template>

<script>
  import DatePicker from '@/components/ui/DatePicker.vue'
  import GameLogEntry from '@/components/game/GameJournal.vue'

  export default {
    name: 'GameLog',
    components: { DatePicker, GameLogEntry },
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
