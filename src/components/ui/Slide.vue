
<template lang="pug">
  .slide(:style="slideStyles" :class="slideClass")
    slot
</template>

<script>
  export default {
    name: 'Slide',
    inject: ['data'],
    props: {
      index: Number,
      isClone: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        active: false,
        next: false,
        prev: false
      }
    },
    computed: {
      slideStyles () {
        return {
          width: `${this.data.slideWidth}px`
        }
      },
      slideClass () {
        return { 
          'is-active': this.active,
          'is-next': this.next,
          'is-prev': this.prev
        }
      }
    }
  }
</script>

<style scoped lang="scss">
</style>