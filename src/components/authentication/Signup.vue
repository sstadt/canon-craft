
<template lang="pug">
  .signup
    h2 Signup
    form(@submit.prevent="signUp")
      .form-input
        input(type="text", name="name" placeholder="Display Name", v-model="name", v-validate="'required'")
        span.error(v-show="errors.has('name')") {{ errors.first('name') }}
      .form-input
        input(type="email", name="email" placeholder="Email", v-model="email", v-validate="'required|email'")
        span.error(v-show="errors.has('email')") {{ errors.first('email') }}
      .form-input
        input(type="password", name="password" placeholder="Password", v-model="password", v-validate="'required'")
        span.error(v-show="errors.has('password')") {{ errors.first('password') }}
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
        name: ''
      }
    },
    methods: {
      switchToLogin () {
        this.$emit('change-auth-view', 'Login')
      },
      signUp () {
        this.$validator.validateAll().then((isValid) => {
          if (isValid) {
            this.$store.dispatch('user/signup', {
              email: this.email,
              password: this.password,
              displayName: this.name
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
