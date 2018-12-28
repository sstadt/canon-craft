
<template lang="pug">
  .toast
    transition(name="fade")
      .toast__message(v-for="(message, index) in messages", :key="index")
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Toast',
    computed: {
      ...mapState({
        messages: state => state.toast.messages
      })
    }
  }
</script>

<style scoped lang="scss">
</style>
