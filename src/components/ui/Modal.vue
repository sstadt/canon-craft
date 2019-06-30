
<template lang="pug">
  transition(name="fade")
    .modal(v-if="isVisible", :class="{ 'modal--dialog': this.dialog }")
      .modal__overlay(@click="close")
      .modal__content
        icon-button(v-if="!dialog", label="Close Modal", icon="times", classes="modal__close", @click="close")
        slot(name="content")
</template>

<script>
  import IconButton from '@/components/buttons/IconButton.vue'

  const openModalEvent = new Event('modal-open')
  const closeModalEvent = new Event('modal-close')

  export default {
    name: 'Modal',
    components: { IconButton },
    props: {
      dialog: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isVisible: false
      }
    },
    methods: {
      open () {
        this.isVisible = true
        document.dispatchEvent(openModalEvent)
      },
      close () {
        this.isVisible = false
        document.dispatchEvent(closeModalEvent)
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

      .modal--dialog & {
        min-width: 0;
        width: 100%;
        max-width: 400px;
        padding: $grid-gutter;
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
