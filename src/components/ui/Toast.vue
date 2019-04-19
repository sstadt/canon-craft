
<template lang="pug">
  .toast
    transition-group(name="slide-fade-right")
      .toast__message.u-bg-dark(v-for="message in messages", :key="message.id")
        p.toast__message__copy(v-html="message.text")
        primary-button.toast__message__cta(
          v-if="message.callback", 
          :small="true", 
          :secondary="true", 
          :label="message.label", 
          @click="message.callback"
        )
</template>

<script>
  import { mapState } from 'vuex'

  import PrimaryButton from '@/components/buttons/PrimaryButton.vue'

  export default {
    name: 'Toast',
    components: { PrimaryButton },
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
      display: flex;
      align-items: center;
      justify-content: space-between;

      &__copy {
        line-height: 1.7;
      }

      &__cta {
        margin-left: 10px;
      }
    }
  }
</style>
