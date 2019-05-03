
<template lang="pug">
  .input.auto-textarea(:class="wrapperClass")
    textarea(
      v-model="currentValue",
      :class="inputClass",
      :style="inputStyle"
    )
    textarea.shadow(
      v-model="currentValue",
      ref="shadow",
      :class="inputClass"
    )
</template>

<script>
  import TextInput from '@/components/forms/TextInput.vue'

  export default {
    name: 'AutoTextarea',
    extends: TextInput,
    data () {
      return {
        inputHeight: '0px'
      }
    },
    watch: {
      currentValue () {
        this.resize()
        this.$emit('input', this.currentValue)
      }
    },
    computed: {
      inputStyle () {
        return {
          'min-height': this.inputHeight
        }
      }
    },
    mounted () {
      this.resize()
    },
    methods: {
      resize () {
        this.inputHeight = `${this.$refs.shadow.scrollHeight}px`
      }
    }
  }
</script>

<style scoped lang="scss">
  .auto-textarea {
    textarea {
      resize: none;
      height: 0px;
      overflow: hidden;
      border: 0;

      &.shadow {
        max-height: 0;
        pointer-events: none;
        opacity: 0;
        margin: 0;
      }
    }
  }
</style>