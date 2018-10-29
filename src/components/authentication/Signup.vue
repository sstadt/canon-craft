
<template lang="pug">
  .signup
    p Signup Component
    form(@submit.prevent="signUp")
      input(type="email", placehold="Email", v-model="email")
      input(type="password", placehold="Password", v-model="password")
      input(type="password", placehold="Confirm Password", v-model="confirm")
      button(type="submit") Login
    a(href="#", @click.prevent="login") Login
</template>

<script>
  export default {
    name: 'Signup',
    data() {
      return {
        email: '',
        password: '',
        confirm: ''
      }
    },
    methods: {
      login() {
        this.$emit('change-auth-view', 'Login')
      },
      signUp() {
        alert('TODO: Sign Up!')
      }
    }
  }
</script>

<style scoped lang="scss">
</style>