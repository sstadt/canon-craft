
<template lang="pug">
  .image-input(:class="wrapperClass")
    label(v-if="!hideLabel") {{ label }}
    input(type="text", :name="name", v-model="currentValue", :class="inputClass")
    span.error(v-if="error") {{ error }}
</template>

<script>
  // TODO: This is a placeholder component right now
  //       will wire this up later for image uploads
  //       once the account file management functionality
  //       is built out
  import TextInput from '@/components/forms/TextInput.vue'

  export default {
    name: 'ImageInput',
    extends: TextInput
  }
</script>

<style scoped lang="scss">
</style>