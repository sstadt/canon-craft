
<template lang="pug">
  .password-input(:class="wrapperClass")
    label(v-if="!hideLabel") {{ label }}
    input(type="password", :name="name", v-model="currentValue", :class="inputClass")
    password-strength(v-if="showStrength", :password="currentValue")
    span.error(v-if="error") {{ error }}
</template>

<script>
  import TextInput from '@/components/forms/TextInput.vue'
  import PasswordStrength from '@/components/ui/PasswordStrength.vue'

  export default {
    name: 'PasswordInput',
    extends: TextInput,
    components: { PasswordStrength },
    props: {
      showStrength: {
        type: Boolean,
        default: false
      },
      validateAs: String
    }
  }
</script>

<style scoped lang="scss">
</style>