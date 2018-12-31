
<template lang="pug">
  .request-reset
    h2.modal__title Forgot Password
    transition(name="fade")
      .alert.alert--success(v-if="requestSubmitted") Check your email!
    form.auth__form(@submit.prevent="requestReset", novalidate)
      .form-input
        input(type="email", name="email", placeholder="Email", v-model="email", v-validate="'required|email'")
        span.error(v-show="errors.has('email')") {{ errors.first('email') }}
      button.button.button--full(type="submit") Send Reset Instructions
    .auth__links
      a(href="#", @click.prevent="switchView('Login')") Login
</template>

<script>
  export default {
    name: 'ForgotPassword',
    data () {
      return {
        requestSubmitted: false,
        email: ''
      }
    },
    methods: {
      switchView (view) {
        this.$emit('change-auth-view', view)
      },
      requestReset () {
        this.$validator.validateAll().then((isValid) => {
          if (isValid) {
            this.$store.dispatch('user/requestReset', this.email)
            this.requestSubmitted = true
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
