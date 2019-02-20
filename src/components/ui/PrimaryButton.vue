
<template lang="pug">
  button.button(:type="buttonType", :class="buttonClass" @click="$emit('click')")
    span {{ label }}
</template>

<script>
  export default {
    name: 'MyComponent',
    props: {
      label: String,
      icon: String,
      small: {
        type: Boolean,
        default: false
      },
      hollow: {
        type: Boolean,
        default: false
      },
      secondary: {
        type: Boolean,
        default: false
      },
      submit: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        buttonType: (this.submit) ? 'submit' : 'button'
      }
    },
    computed: {
      buttonClass () {
        return {
          'button--small': this.small === true,
          'button--hollow': this.hollow === true,
          'button--secondary': this.secondary === true
        }
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
