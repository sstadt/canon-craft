
<template lang="pug">
  .login
    h2 Login Component
    form(@submit.prevent="login")
      input(type="email", placehold="Email", v-model="email")
      input(type="password", placehold="Password", v-model="password")
      button(type="submit") Login
    a(href="#", @click.prevent="signUp") Sign Up
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signUp() {
        this.$emit('change-auth-view', 'Signup')
      },
      login() {
        alert('TODO: Log in!')
      }
    }
  }
</script>

<style scoped lang="scss">
</style>