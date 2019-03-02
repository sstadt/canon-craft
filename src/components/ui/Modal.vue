
<template lang="pug">
  transition(name="fade")
    .modal(v-if="isVisible")
      .modal__overlay(@click="close")
      .modal__content
        icon-button(label="Close Modal", icon="times", classes="modal__close", @click="close")
        slot(name="content")
</template>

<script>
  import IconButton from '@/components/buttons/IconButton.vue'

  export default {
    name: 'Modal',
    components: { IconButton },
    data() {
      return {
        isVisible: false
      }
    },
    methods: {
      open () {
        this.isVisible = true
      },
      close () {
        this.isVisible = false
      }
    }
  }
</script>

<style lang="scss">
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    min-height: 100vh;
    width: 100%;
    overflow-y: auto;
    background-color: $overlay-bg;

    &__overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    &__content {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 50px;
      max-width: 100%;
      background-color: $body-bg--main;
      padding: 30px;

      @include mobile-only {
        min-height: 100vh;
        width: 100%;
      }

      @include tablet-up {
        top: 50px;
        min-width: 500px;
        padding: 65px;
      }
    }

    &__title {
      margin-bottom: $content-gutter;
    }

    &__close {
      position: absolute;
      top: 10px;
      right: 10px;
      height: 44px;
      width: 44px;
      font-size: rem(36);
      line-height: 44px;
      padding: 8px;
      text-align: center;
    }
  }
</style>
