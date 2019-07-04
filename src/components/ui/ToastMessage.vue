
<template lang="pug">
  .toast__message(:class="bgClass")
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
  import PrimaryButton from '@/components/buttons/PrimaryButton.vue'

  export default {
    name: 'ToastMessage',
    components: { PrimaryButton },
    props: {
      message: Object
    },
    computed: {
      bgClass () {
        return {
          'u-bg-dark': !this.message.type,
          'u-bg-success': this.message.type === 'success'
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .toast__message {
    padding: 20px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__copy {
      line-height: 1.7;
      color: $body-text--light;
    }

    &__cta {
      margin-left: 10px;
    }
  }
</style>