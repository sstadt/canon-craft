
<template lang="pug">
  svg(:class="iconClass")
    use(xmlns:xlink="http://www.w3.org/1999/xlink", :xlink:href="name")
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .icon {
    fill: #000;
  }
</style>
