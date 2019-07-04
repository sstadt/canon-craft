
<template lang="pug">
  .user-details
    h2.u-mb-content Profile Information
    form.u-mb(@submit.prevent="updateUserDetails")
      text-input(
        label="Display Name",
        type="text",
        v-model="displayName", 
        v-validate="'required'"
        :error="errors.first('display-name')"
      )
      image-input(
        label="Avatar", 
        type="text",
        v-model="photoURL", 
        v-validate="'required'",
        :error="errors.first('avatar')"
      )
      submit-button(label="Save Details", :small="true")
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
  import TextInput from '@/components/forms/TextInput.vue'
  import ImageInput from '@/components/forms/ImageInput.vue'
  import PasswordInput from '@/components/forms/PasswordInput.vue'
  import SubmitButton from '@/components/buttons/SubmitButton.vue'

  export default {
    name: 'UserDetails',
    components: { TextInput, ImageInput, PasswordInput, SubmitButton },
    props: {
      user: Object,
      data: Object
    },
    data () {
      return {
        displayName: this.user.displayName,
        photoURL: this.user.photoURL,
        email: this.user.email,
        password: '',
        confirmPassword: ''
      }
    },
    methods: {
      updateUserDetails () {
        this.$store.dispatch('user/updateUser', {
          displayName: this.displayName,
          photoURL: this.photoURL
        })
      },
      resetPassword () {
        console.log('TODO: reset password')
      }
    }
  }
</script>

<style scoped lang="scss">
</style>