
<template lang="pug">
  .login
    h2 Login
    form(@submit.prevent="login")
      input(type="email", placeholder="Email", v-model="email")
      input(type="password", placeholder="Password", v-model="password")
      button(type="submit") Login
    button(type="button", @click="googleLogin") Google Login
    a(href="#", @click.prevent="switchToSignUp") Sign Up
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      switchToSignUp () {
        this.$emit('change-auth-view', 'Signup')
      },
      login () {
        this.$store.dispatch('user/login', {
          email: this.email,
          password: this.password
        })
      },
      googleLogin () {
        this.$store.dispatch('user/googleLogin')
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
