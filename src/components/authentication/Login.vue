
<template lang="pug">
  .login
    h2.modal__title Login
    form.auth__form(@submit.prevent="login", novalidate)
      .form-input
        input(type="email", name="email", placeholder="Email", v-model="email", v-validate="'required|email'")
        span.error(v-show="errors.has('email')") {{ errors.first('email') }}
      .form-input
        input(type="password", name="password", placeholder="Password", v-model="password", v-validate="'required'")
        span.error(v-show="errors.has('password')") {{ errors.first('password') }}
      button.button.button--full(type="submit") Sign In
    button.button.button--full.button--google(type="button", @click="googleLogin")
      icon(name="google")
      span Sign in with Google
    .auth__links
      a(href="#", @click.prevent="switchView('Signup')") Sign Up
      a(href="#", @click.prevent="switchView('ForgotPassword')") forgot password?
</template>

<script>
  import Icon from '@/components/ui/Icon.vue'

  export default {
    name: 'Login',
    data () {
      return {
        email: '',
        password: ''
      }
    },
    components: { Icon },
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
  .login {
    .button--google {
      margin-top: $content-gutter;
    }
  }
</style>
