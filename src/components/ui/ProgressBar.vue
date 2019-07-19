
<template lang="pug">
  progress.progress-bar(max="100", :value="progress")
</template>

<script>
  export default {
    name: 'ProgressBar',
    props: {
      progress: Number,
      color: {
        type: String,
        default: '#db162e'
      }
    }
  }
</script>

<style scoped lang="scss">
</style>