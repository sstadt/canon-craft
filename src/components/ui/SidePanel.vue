
<template lang="pug">
  transition-group(name="off-canvas-right")
    .side-panel--overlay(v-if="show", @click="close", key="overlay")
    .side-panel(v-if="show", v-touch:swipe.right="close", key="content")
      .side-panel__header
        img.side-panel__image(v-lazy="image", v-if="image")
        .side-panel__header__content
          h2.side-panel__title {{ title }}
          .side-panel__header__controls
            slot(name="controls")
        .side-panel__share
          slot(name="share")
      .side-panel__content
        slot(name="content")
</template>

<script>
  const openSidepanelEvent = new Event('sidepanel-open')
  const closeSidepanelEvent = new Event('sidepanel-close')

  export default {
    name: 'SidePanel',
    data () {
      return {
        show: false
      }
    },
    props: {
      title: String,
      image: String
    },
    methods: {
      open () {
        this.show = true
        document.dispatchEvent(openSidepanelEvent)
      },
      close () {
        this.show = false
        document.dispatchEvent(closeSidepanelEvent)
      }
    }
  }
</script>

<style scoped lang="scss">
  .side-panel {
    display: flex;
    flex-direction: column;
    width: 400px;
    max-width: 90vw;
    background-color: #fff;
    border-left: 5px solid $body-bg--dark;
    box-shadow: 0 0 10px $overlay-bg;
    padding: $content-gutter;
    overflow-y: auto;
    overflow-x: hidden;

    &, &--overlay {
      position: fixed;
      top: 0;
      right: 0;
      height: 100%;
    }

    &--overlay {
      width: 100vw;
      background-color: transparent;
    }

    &__image {
      max-height: 200px;
      margin-bottom: $content-gutter;
    }

    &__title {
      flex-grow: 1;
    }

    &__header,
    &__title {
      padding-bottom: $content-gutter
    }

    &__header {
      &__content {
        display: flex;
      }

      &__controls {
        flex-shrink: 0;
      }
    }

    &__content {
      flex-grow: 1;
      flex-shrink: 0;
    }
  }
</style>