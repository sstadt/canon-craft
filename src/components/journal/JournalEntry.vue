
<template lang="pug">
  .journal__entry {{ entry.title }}
</template>

<script>
  export default {
    name: 'JournalEntry',
    props: {
      entry: Object
    }
  }
</script>

<style scoped lang="scss">
</style>
