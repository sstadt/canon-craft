
<template lang="pug">
  div(:class="wrapperClass")
    label(v-if="!hideLabel") {{ label }}
    icon(v-if="icon", :name="icon", size="iconSize")
    input(type="text", :name="name", v-model="currentValue", :class="inputClass", v-validate="validation")
    span.error(v-if="errors", v-show="errors.has(name)") {{ errors.first(name) }}
</template>

<script>
  import { handleize } from '@/lib/util.js'

  export default {
    name: 'TextInput',
    props: {
      label: String,
      value: String,
      h1: Boolean,
      h2: Boolean,
      h3: Boolean,
      h4: Boolean,
      h5: Boolean,
      h6: Boolean,
      validation: {
        type: String,
        default: ''
      },
      icon: String,
      iconSize: {
        type: String,
        default: '14'
      },
      type: {
        type: String,
        default: 'form',
        validator (value) {
          let types = ['form', 'game', 'controls', 'icon']
          return types.indexOf(value) > -1
        }
      },
      hideLabel: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        currentValue: this.value
      }
    },
    watch: {
      currentValue () {
        this.$emit('input', this.currentValue)
      }
    },
    computed: {
      wrapperClass () {
        return {
          'game-input': this.type === 'game',
          'form-input': this.type === 'form',
          'controls-input': this.type === 'controls',
          'icon-input': this.icon
        }
      },
      inputClass () {
        return {
          'h1': this.h1,
          'h2': this.h2,
          'h3': this.h3,
          'h4': this.h4,
          'h5': this.h5,
          'h6': this.h6
        }
      },
      name () {
        return handleize(this.label)
      }
    }
  }
</script>

<style scoped lang="scss">
</style>