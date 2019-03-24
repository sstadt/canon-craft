
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
    fill: $body-text--main;
    transition: 0.3s ease all;

    .missive & {
      fill: $body-text--light;
    }

    &--underline {
      transform: translateY(22%);
    }

    h1 &, h2 &, h3 &, h4 &, h5 &, h6 &, p & {
      letter-spacing: 1px;
      vertical-align: sub;
    }
  }
</style>
