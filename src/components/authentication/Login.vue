
<template lang="pug">
  .login
    h2 Login
    form(@submit.prevent="login", novalidate)
      .form-input
        input(type="email", name="email", placeholder="Email", v-model="email", v-validate="'required|email'")
        span.error(v-show="errors.has('email')") {{ errors.first('email') }}
      .form-input
        input(type="password", name="password", placeholder="Password", v-model="password", v-validate="'required'")
        span.error(v-show="errors.has('password')") {{ errors.first('password') }}
      button(type="submit") Login
    button(type="button", @click="googleLogin") Google Login
    a(href="#", @click.prevent="switchView('Signup')") Sign Up
    a(href="#", @click.prevent="switchView('ForgotPassword')") forgot password?
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
      switchView (view) {
        this.$emit('change-auth-view', view)
      },
      login () {
        this.$validator.validateAll().then((isValid) => {
          if (isValid) {
            this.$store.dispatch('user/login', {
              email: this.email,
              password: this.password
            })
          }
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
