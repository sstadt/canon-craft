
<template lang="pug">
  transition(name="off-canvas-right")
    .side-panel(v-if="show", v-touch:swipe.right="close", v-click-outside="dismiss")
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
      title: String
    },
    methods: {
      open () {
        console.log('show outer')
        this.$nextTick(() => {
          console.log('show inner')
          this.show = true
        })
        // this.show = true
      },
      close () {
        this.show = false
      },
      dismiss () {
        console.log('dismiss')
      }
    }
  }
</script>

<style scoped lang="scss">
  .side-panel {
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 0;
    right: 0;
    height: 100%;
    width: 300px;
    padding: 10px;
    max-width: 90vw;
    background-color: #fff;
    border-left: 5px solid $body-bg--dark;

    &__content {
      flex-grow: 1;
      overflow-y: auto;
    }
  }
</style>