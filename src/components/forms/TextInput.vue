
<template lang="pug">
  .input(:class="wrapperClass")
    icon(v-if="icon", name="search", size="iconSize")
    input(v-model="currentValue", :class="inputClass")
</template>

<script>
  export default {
    name: 'TextInput',
    data () {
      return {
        currentValue: this.value
      }
    },
    props: {
      value: String,
      game: Boolean,
      form: Boolean,
      controls: Boolean,
      h1: Boolean,
      h2: Boolean,
      h3: Boolean,
      h4: Boolean,
      h5: Boolean,
      h6: Boolean,
      icon: String,
      iconSize: {
        type: String,
        default: '14'
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
          'game-input': this.game,
          'form-input': this.form,
          'controls-input': this.controls,
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
      }
    }
  }
</script>

<style scoped lang="scss">
</style>