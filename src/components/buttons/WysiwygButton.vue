
<template lang="pug">
  button.button.button--wysiwyg(type="button", @click="$emit('click')", @mousedown.prevent)
    span.u-hidden Bold
    icon(:name="icon", :size="size")
</template>

<script>
  import Icon from '@/components/ui/Icon.vue'

  export default {
    name: 'WysiwygButton',
    components: { Icon },
    props: {
      label: String,
      icon: String,
      size: String
    }
  }
</script>

<style scoped lang="scss">
</style>