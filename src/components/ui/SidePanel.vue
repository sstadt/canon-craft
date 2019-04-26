
<template lang="pug">
  transition-group(name="off-canvas-right")
    .side-panel--overlay(v-if="show", @click="close", key="overlay")
    .side-panel(v-if="show", v-touch:swipe.right="close", key="content")
      .side-panel__header
        img.side-panel__image(:src="image", v-if="image")
        h2.side-panel__title {{ title }}
      .side-panel__content
        slot(name="content")
</template>

<script>
  import IconButton from '@/components/buttons/IconButton.vue'

  export default {
    name: 'SidePanel',
    components: { IconButton },
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
      },
      close () {
        this.show = false
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

    &__header {
      padding: $content-gutter;
    }

    &__content {
      padding: 0 $content-gutter $content-gutter $content-gutter;
      flex-grow: 1;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
</style>