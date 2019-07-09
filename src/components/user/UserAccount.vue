
<template lang="pug">
  .user-account
    .row
      .column.small-12.medium-6
        h2.u-mb-content Change Password
        form.u-mb-content(@submit.prevent="resetPassword")
          password-input(
            label="New Password", 
            ref="password"
            v-model="password", 
            :show-strength="true", 
            v-validate="'required'",
            :error="errors.first('password')"
          )
          password-input(
            label="Confirm Password", 
            v-model="confirmPassword",
            v-validate="'required|confirmed:password'",
            data-vv-as="password",
            :error="errors.first('confirm-password')"
          )
          submit-button(label="Update Password", :small="true")
</template>

<script>
  import PasswordInput from '@/components/forms/PasswordInput.vue'
  import SubmitButton from '@/components/buttons/SubmitButton.vue'

  export default {
    name: 'UserAccount',
    components: { PasswordInput, SubmitButton },
    data () {
      return {
        password: '',
        confirmPassword: ''
      }
    },
    methods: {
      resetPassword () {
        console.log('TODO: reset password')
      }
    }
  }
</script>

<style scoped lang="scss">
</style>