
<template lang="pug">
  .capacity-bar--wrapper
    .capacity-bar
      .capacity-bar__progress(:style="barStyle")
    p.capacity-bar__label You have used {{ usage | fileSize }} of {{ capacity | fileSize }} available space
</template>

<script>
  export default {
    name: 'CapacityBar',
    props: {
      capacity: Number,
      usage: Number
    },
    computed: {
      progress () {
        return Math.round(this.usage / this.capacity * 100)
      },
      barStyle () {
        return {
          'width': `${this.progress}%`
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .capacity-bar {
    position: relative;
    height: 20px;
    background-color: $color-light-grey;
    margin-bottom: 8px;

    &__progress {
      height: 100%;
      background-color: $color--primary;
    }

    &--wrapper {
      margin-bottom: $grid-gutter;
    }
  }
</style>