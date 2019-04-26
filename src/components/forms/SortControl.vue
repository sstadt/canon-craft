
<template lang="pug">
  .controls-input.select
    select(v-model="sortBy")
      option(v-for="option in options", :value="option.value") {{ option.label }}
</template>

<script>
  export default {
    name: 'SortControl',
    props: {
      value: String,
      options: Array
    },
    data () {
      return {
        sortBy: this.value
      }
    },
    watch: {
      sortBy () {
        this.$emit('input', this.sortBy)
      }
    }
  }
</script>

<style scoped lang="scss">
</style>