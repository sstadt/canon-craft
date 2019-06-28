
<template lang="pug">
  primary-button.context-menu-item(
    :label="label", 
    :icon="icon",
    :small="true",
    :light="true",
    @click="$emit('click')"
  )
</template>

<script>
  import PrimaryButton from '@/components/buttons/PrimaryButton.vue'

  export default {
    name: 'ContextMenuItem',
    components: { PrimaryButton },
    props: {
      icon: String,
      label: String
    }
  }
</script>

<style scoped lang="scss">
  .context-menu-item {
    display: flex;
    justify-content: space-between;
    text-align: right;
  }
</style>