
<template lang="pug">
  transition(name="fade", @after-enter="triggerTextWipe")
    .missive.modal(v-if="isVisible")
      .modal__overlay
      .modal__content
        icon-button(label="Close Modal", icon="times", classes="modal__close", @click="close")
        transition-group(name="fade")
          h3.missive__title(v-if="title && showText", key="title") {{ title }}
          .missive__content(v-if="showText", key="body")
            slot(name="content")
</template>

<script>
  import IconButton from '@/components/buttons/IconButton.vue'

  export default {
    name: 'Missive',
    components: { IconButton },
    props: {
      title: String,
      content: String
    },
    data() {
      return {
        isVisible: false,
        showText: false
      }
    },
    methods: {
      open () {
        this.isVisible = true
      },
      close () {
        this.isVisible = false
        this.showText = false
      },
      triggerTextWipe () {
        this.showText = true
      }
    }
  }
</script>

<style scoped lang="scss">
  $gradient-color: #000;
  $dark: 0.7;
  $light: 0.2;

  .modal {
    &__content {
      top: 0;
      margin-bottom: 0;
      margin-top: 0;
      min-width: 80%;
      padding: 30px;
      background-color: transparent;
      color: $body-text--light;
      min-height: 100%;

      .icon {
        fill: $body-text--light;
      }
    }

    &__close {
      position: fixed;
      top: 20vh;
    }

    &__overlay {
      background-color: rgba($gradient-color, $dark);
    }
  }

  .missive {
    &__title {
      margin-top: 30vh;
      margin-bottom: $content-gutter;
    }

    &__content {
      transition: 0.3s ease all;
    }
  }
</style>
