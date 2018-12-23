
<template lang="pug">
  transition(name="fade")
    .loading-indicator.u-bg-overlay(v-if="isLoading")
      icon(name="compass-rose", size="80px")
      p.loading-indicator__message(v-if="message.length > 0") {{ message }}
</template>

<script>
  import { mapState } from 'vuex'

  import Icon from '@/components/ui/Icon.vue'

  export default {
    name: 'LoadingIndicator',
    components: { Icon },
    computed: {
      ...mapState({
        isLoading: state => state.loading.isLoading,
        message: state => state.loading.message
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .loading-indicator {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    padding: 0 $grid-gutter;
    text-align: center;

    .icon {
      fill: $body-text--accent;
      animation: rotating 2s linear infinite;
    }

    &__message {
      max-width: 500px;
      margin-top: 20px;
      font-size: rem(24);
      color: $body-text--accent;
    }
  }
</style>
