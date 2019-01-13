
<template lang="pug">
  .confirm-button
    transition(name="fade", mode="out-in")
      button.button(v-if="initiated", type="button", :class="buttonClass" @click="confirmed") {{ confirmLabel }}
      button.button.button--hollow(v-else, type="button", :class="buttonClass" @click="firstClick") {{ label }}
</template>

<script>
  export default {
    name: 'MyComponent',
    props: {
      label: String,
      secondary: {
        type: Boolean,
        default: false
      },
      small: {
        type: Boolean,
        default: false
      },
      confirmLabel: {
        type: String,
        default: 'Are you sure?'
      },
      timeout: {
        type: Number,
        default: 20000
      }
    },
    data () {
      return {
        initiated: false
      }
    },
    computed: {
      buttonClass () {
        return {
          'button--small': this.small,
          'button--secondary': this.secondary
        }
      }
    },
    methods: {
      firstClick () {
        this.initiated = true
        setTimeout(() => this.initiated = false, this.timeout)
      },
      confirmed () {
        this.$emit('confirmed')
      }
    }
  }
</script>

<style scoped lang="scss">
  .confirm-button {
    display: inline-block;
  }
</style>
