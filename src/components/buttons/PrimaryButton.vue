
<template lang="pug">
  button.button(
    type="button", 
    :class="buttonClass", 
    :disabled="disabled", 
    @click="$emit('click')"
  )
    icon(v-if="icon", :name="icon", :size="iconSize")
    span {{ label }}
</template>

<script>
  import Icon from '@/components/ui/Icon.vue'

  export default {
    name: 'PrimaryButton',
    components: { Icon },
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
      },
      disabled: {
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
          'button--primary': this.secondary === false,
          'button--secondary': this.secondary === true,
          'button--hollow': this.hollow === true,
          'button--small': this.small === true
        }
      },
      iconSize () {
        return (this.small) ? 12 : 16
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
