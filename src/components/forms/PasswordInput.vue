
<template lang="pug">
  .password-input(:class="wrapperClass")
    label(v-if="!hideLabel") {{ label }}
    input.password-input__input(type="password", :name="name", v-model="currentValue", :class="inputClass")
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
  .password-input__input {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
</style>