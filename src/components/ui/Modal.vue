
<template lang="pug">
  transition(name="fade")
    .modal(v-if="isVisible")
      .modal__overlay(@click="close()")
      .modal__content
        a.modal__close(href="#", @click.prevent="close()") &times;
        slot(name="content")
</template>

<script>
  export default {
    name: 'Modal',
    data() {
      return {
        isVisible: false
      }
    },
    methods: {
      open() {
        this.isVisible = true
      },
      close() {
        this.isVisible = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    min-height: 100vh;
    width: 100%;
    overflow-y: auto;

    &__overlay {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: $transparent-overlay;
    }

    &__content {
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 65px;
      background-color: $body-bg--main;
    }

    &__close {
      position: absolute;
      top: 10px;
      right: 10px;
      height: 44px;
      width: 44px;
      font-size: rem(30);
      line-height: 1;
      padding: 8px;
    }
  }
</style>
