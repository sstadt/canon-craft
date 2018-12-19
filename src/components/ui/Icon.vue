
<template lang="pug">
  svg(:class="iconClass")
    use(xmlns:xlink="http://www.w3.org/1999/xlink", :xlink:href="iconName")
</template>

<script>
  export default {
    name: 'MyComponent',
    props: {
      name: String
    },
    computed: {
      iconClass () {
        let iconClass = { 'icon': true };

        iconClass[`icon--${this.name}`] = true;

        return iconClass
      },
      iconName () {
        return `#icon-${this.name}`
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .icon {
    fill: #000;
    height: 24px;
    width: 24px;

    svg {
      height: 100%;
      width: 100%;
    }
  }
</style>
