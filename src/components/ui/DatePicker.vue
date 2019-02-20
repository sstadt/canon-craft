
<template lang="pug">
  .date-picker
    datepicker(v-model="currentDate", :class="{ 'game-input': true }")
</template>

<script>
  import Datepicker from 'vuejs-datepicker'

  export default {
    name: 'DatePicker',
    components: {
      Datepicker
    },
    props: {
      value: Date
    },
    data () {
      return {
        currentDate: new Date()
      }
    },
    watch: {
      currentDate () {
        this.$emit('input', this.currentDate)
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
