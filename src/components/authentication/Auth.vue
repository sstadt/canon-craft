
<template lang="pug">
  .auth
    transition(name="fade", mode="out-in")
      component(:is="currentAuthView", @change-auth-view="changeView")
</template>

<script>
  import Login from '@/components/authentication/Login.vue'
  import Signup from '@/components/authentication/Signup.vue'
  import ForgotPassword from '@/components/authentication/ForgotPassword.vue'

  export default {
    name: 'Auth',
    components: {
      Login,
      Signup,
      ForgotPassword
    },
    data () {
      return {
        currentAuthView: 'Login'
      }
    },
    methods: {
      changeView (view) {
        this.currentAuthView = view;
      }
    }
  }
</script>

<style lang="scss">
  .auth {
    &__form {
      width: 340px;
      max-width: 100%;
    }

    &__links {
      display: flex;
      justify-content: space-between;
      margin-top: $content-gutter;
    }
  }
</style>
