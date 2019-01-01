
<template lang="pug">
  svg(:class="iconClass", :style="iconStyle")
    use(xmlns:xlink="http://www.w3.org/1999/xlink", :xlink:href="iconName")
</template>

<script>
  export default {
    name: 'Icon',
    props: {
      name: String,
      size: {
        type: String,
        default: '24px'
      }
    },
    computed: {
      iconClass () {
        let iconClass = { 'icon': true };

        iconClass[`icon--${this.name}`] = true;

        return iconClass
      },
      iconStyle () {
        return {
          'height': this.size,
          'width': this.size
        }
      },
      iconName () {
        return `#icon-${this.name}`
      }
    }
  }
</script>

<style scoped lang="scss">
  .icon {
    fill: #000;
    transition: 0.3s ease all;
  }
</style>
