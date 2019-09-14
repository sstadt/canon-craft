
<template lang="pug">
  button.button(
    type="button", 
    ref="button",
    :class="buttonClass", 
    :disabled="disabled", 
    @click="$emit('click')"
  )
    icon(v-if="icon", :name="icon", :size="iconSize")
    span {{ label }}
</template>

<script>
  import { getClassesFromString } from '@/lib/util.js'

  import Icon from '@/components/ui/Icon.vue'

  export default {
    name: 'PrimaryButton',
    components: { Icon },
    props: {
      label: String,
      icon: String,
      classes: {
        type: String,
        defalt: ''
      },
      small: {
        type: Boolean,
        default: false
      },
      inline: {
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
      light: {
        type: Boolean,
        default: false
      },
      wide: {
        type: Boolean,
        deafult: false
      },
      jumbo: {
        type: Boolean,
        default: false
      },
      text: {
        type: Boolean,
        default: false
      },
      flex: {
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
        let additionalClasses = getClassesFromString(this.classes || '')
        
        return {
          ...additionalClasses,
          'button--primary': this.secondary === false,
          'button--secondary': this.secondary === true,
          'button--light': this.light === true,
          'button--hollow': this.hollow === true,
          'button--small': this.small === true,
          'button--jumbo': this.jumbo === true,
          'button--inline': this.inline === true,
          'button--full': this.wide === true,
          'button--text': this.text === true,
          'button--flex': this.flex === true
        }
      },
      iconSize () {
        return (this.small) ? '12px' : '16px'
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
