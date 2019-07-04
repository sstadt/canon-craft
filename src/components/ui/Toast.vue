
<template lang="pug">
  .toast
    transition-group(name="slide-fade-right")
      toast-message(v-for="message in messages", :message="message", :key="message.id")
</template>

<script>
  import { mapState } from 'vuex'

  import ToastMessage from '@/components/ui/ToastMessage.vue'

  export default {
    name: 'Toast',
    components: { ToastMessage },
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
  }
</style>
