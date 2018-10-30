
<template lang="pug">
  .signup
    h2 Signup
    form(@submit.prevent="signUp")
      input(type="email", placeholder="Email", v-model="email")
      input(type="password", placeholder="Password", v-model="password")
      input(type="password", placeholder="Confirm Password", v-model="confirm")
      button(type="submit") Sign Up
    a(href="#", @click.prevent="switchToLogin") Login
</template>

<script>
  export default {
    name: 'Signup',
    data () {
      return {
        email: '',
        password: '',
        confirm: ''
      }
    },
    methods: {
      switchToLogin () {
        this.$emit('change-auth-view', 'Login')
      },
      signUp () {
        this.$store.dispatch('user/signup', {
          email: this.email,
          password: this.password
        })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
