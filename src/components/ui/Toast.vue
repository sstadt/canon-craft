
<template lang="pug">
  .toast
    transition-group(name="slide-fade-right")
      .toast__message.u-bg-dark(v-for="message in messages", :key="message.id")
        p(v-html="message.text")
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
  .toast {
    position: fixed;
    bottom: 10px;
    left: 10px;
    width: calc(100% - 20px);
    max-width: 300px;

    &__message {
      padding: 20px;
      margin-top: 10px;
    }
  }
</style>
