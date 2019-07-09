
<template lang="pug">
  .user-account
    .row
      .column.small-12.medium-6
        h2.u-mb-content Change Password
        form.u-mb-content(@submit.prevent="resetPassword")
          password-input(
            label="Current Password",
            ref="current",
            v-model="currentPassword",
            v-validate="'required'",
            :error="errors.first('current-password')"
          )
          password-input(
            label="New Password", 
            ref="password"
            v-model="newPassword", 
            :show-strength="true", 
            v-validate="'required'",
            :error="errors.first('new-password')"
          )
          password-input(
            label="Confirm New Password",
            ref="confirm"
            v-model="confirmPassword",
            v-validate="'required|confirmed:password'",
            data-vv-as="confirm new password",
            :error="errors.first('confirm-new-password')"
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
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    },
    methods: {
      resetForm () {
        this.currentPassword = ''
        this.newPassword = ''
        this.confirmPassword = ''
        this.$validator.reset()
        
        this.$nextTick(() => {
          this.$refs.current.sync()
          this.$refs.password.sync()
          this.$refs.confirm.sync()
        })
      },
      resetPassword () {
        this.$validator.validateAll().then((isValid) => {
          if (isValid) {
            this.$store.dispatch('user/updatePassword', {
              currentPassword: this.currentPassword,
              newPassword: this.newPassword
            }).then(() => this.resetForm())
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>