
<template lang="pug">
  button.button.button--icon(
    type="button", 
    :class="buttonClass", 
    :disabled="disabled", 
    @click="$emit('click')"
  )
    img(v-if="image", :src="image", :class="imgClass")
    icon(v-else="icon", :name="icon", :size="size")
    span.u-hidden {{ label }}
</template>

<script>
  import { getClassesFromString } from '@/lib/util.js'

  import Icon from '@/components/ui/Icon.vue'
  import PrimaryButton from '@/components/buttons/PrimaryButton.vue'

  export default {
    extends: PrimaryButton,
    components: { Icon },
    name: 'IconButton',
    props: {
      size: String,
      image: String,
      imageClasses: String,
      primary: Boolean
    },
    computed: {
      imgClass () {
        return getClassesFromString(this.imageClasses || '')
      },
      buttonClass () {
        let additionalClasses = getClassesFromString(this.classes || '')
        
        return {
          ...additionalClasses,
          'button--primary': this.primary === true,
          'button--flex': this.flex === true
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .button--icon {
    line-height: 0;
  }
</style>